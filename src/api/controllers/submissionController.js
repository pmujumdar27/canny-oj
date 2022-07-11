const Submission = require('../models/submission');
const User = require('../models/user');
const objectUtils = require('../helpers/object');
const jwtUtils = require('../helpers/jwtHelpers');

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
            await Submission.query().insert(submissionObj);
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
        var reject_keys = ['solution_file'];
        
        // if own submission give code as well
        if (submission.user_id === user_id) {
            reject_keys = [];
        }

        const filtered = objectUtils.reject(submission, reject_keys);

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
        const submissions = await Submission.query();
        const reject_keys = ['solution_file'];

        const filtered = submissions.map(sub => objectUtils.reject(sub, reject_keys));

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

module.exports = {
    add_submission,
    get_submission_by_id,
    get_submissions
}