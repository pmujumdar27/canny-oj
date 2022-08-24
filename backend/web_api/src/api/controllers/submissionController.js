const Submission = require('../models/submission');
const objectUtils = require('../helpers/object');
const jwtUtils = require('../helpers/jwtHelpers');
const fs = require('fs/promises');
const User = require('../models/user');
const Problem = require('../models/problem');

async function check_post_request(req) {
    const required_keys = ['language', 'problem_id'];
    const missing = objectUtils.missing_keys(req.body, required_keys);
    if (missing.length > 0) {
        return Error(`Required keys not found: ${missing.join(', ')}`);
    }
    return true;
}

async function add_submission(req, res) {
    try {
        const request = await check_post_request(req);
        if (request === true) {
            const submissionObj = {
                user_id: jwtUtils.get_user_id(req),
                problem_id: parseInt(req.body.problem_id, 10),
                language: req.body.language,
                solution_file: req.file.path
            };

            let resp = await Submission.query().insert(submissionObj);

            const problem_obj = await Problem.query().findById(resp.problem_id);

            resp = {
                ...resp,
                problem_obj: problem_obj
            }

            // ============== Send submission details to RabbitMQ for judge service to consume ====================
            const channel = req.app.get('channel');
            await channel.assertQueue('submissions');
            await channel.sendToQueue(
                'submissions',
                Buffer.from(JSON.stringify(resp))
            )
            console.log('[INFO] Data sent to RabbitMQ');
            // ============================== END ===============================

            res.status(201).json({
                status: 'success',
                description: submissionObj
            });
        }
        else{
            if (req.file) {
                // [TODO] delete the submission file from storage
            }
            res.status(400).json({
                status: 'failure',
                description: request.message
            });
            return;
        }
    }
    catch (ex) {
        console.log(`[ERROR]: ${ex.stack}`);
        res.status(500).json({
            status: 'failure',
            description: 'Internal server error'
        })
    }
}

async function get_submission_by_id(req, res) {
    try {
        const submission_id = req.params.id;
        const submission = await Submission.query().findById(submission_id);
        const user_id = jwtUtils.get_user_id(req);

        const curUser = await User.query().findById(user_id).withGraphFetched('permissions');

        const curPermissions = curUser.permissions;
        let hasJudgePermission = false;
        for (permission of curPermissions) {
            if (permission.key === 'access_submissions'){
                hasJudgePermission = true;
                break;
            }
        }

        if (hasJudgePermission) {
            const solution_code = await fs.readFile(submission.solution_file, { encoding: 'utf8' });
            submission.solution_code = solution_code;
            return res.json({
                status: 'success',
                data: submission
            });
        }

        var reject_keys = ['solution_file'];
        
        // if own submission give code as well
        if (submission.user_id === user_id) {
            reject_keys = [];
        }

        var filtered = objectUtils.reject(submission, reject_keys);

        if (filtered.solution_file) {
            const solution_code = await fs.readFile(filtered.solution_file, { encoding: 'utf8' });
            filtered.solution_code = solution_code;
            filtered = objectUtils.reject(filtered, ['solution_file']);
        }

        res.json({
            status: 'success',
            data: filtered
        });
    }
    catch (ex) {
        console.log(`[ERROR]: ${ex}`);
        res.status(500).json({
            status: 'failure',
            description: 'Internal server error'
        })
    }
}

async function get_submissions(req, res) {
    try {
        const submissions = await Submission.query().orderBy('created_at', 'desc');
        const reject_keys = ['solution_file'];

        const filtered = submissions.map(sub => objectUtils.reject(sub, reject_keys));

        res.json({
            status: 'success',
            data: filtered
        });
    }
    catch (ex) {
        console.log(`[ERROR]: ${ex.stack}`);
        res.status(500).json({
            status: 'failure',
            description: 'Internal server error'
        })
    }
}

async function update_submission_status_by_id(req, res) {
    try {
        const submission_id = req.params.id;
        const new_status = req.body.status;
        const user_id = jwtUtils.get_user_id(req);
        
        const curUser = await User.query().findById(user_id).withGraphFetched('permissions');
        const curSubmission = await Submission.query().findById(submission_id);

        if(curSubmission == null){
            return res.status(404).json({
                status: 'failure',
                description: 'Submission not found'
            });
        }

        const curPermissions = curUser.permissions;

        let hasUpdatePermission = false;

        for (permission of curPermissions) {
            if (permission.key === 'access_submissions'){
                hasUpdatePermission = true;
                break;
            }
        }

        if (!hasUpdatePermission) {
            return res.status(401).json({
                status: 'failure',
                description: 'Unauthorized! Invalid JWT Token'
            });
        }

        const numUpdated = await Submission.query().findById(submission_id).patch({
            status: new_status
        });

        return res.json({
            status:' success',
            data: 'updated successfully'
        })
    }
    catch (ex) {
        console.log(`[ERROR]: ${ex.stack}`);
        res.status(500).json({
            status: 'failure',
            description: 'Internal server error'
        })
    }
}

module.exports = {
    add_submission,
    get_submission_by_id,
    get_submissions,
    update_submission_status_by_id
}