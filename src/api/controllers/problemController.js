const Problem = require('../models/problem');
const missing_keys = require('../helpers/object');
const jwtUtils = require('../helpers/jwtHelpers');

async function check_post_request(req) {
    const required_keys = ['statement', 'sample_input', 'sample_output', 'title'];
    const missing = missing_keys(req.body, required_keys);
    if (missing.length > 0) {
        return Error(`Required keys not found: ${missing.join(', ')}`);
    }
    return true;
}

async function add_problem(req, res) {
    try {
        const request = await check_post_request(req);
        if (request === true) {
            const problemObj = {
                'title': req.body.title,
                'statement': req.body.statement,
                'sample_input': req.body.sample_input,
                'sample_output': req.body.sample_output,
                'test_input': req.files.test_input[0].filename,
                'test_output': req.files.test_output[0].filename,
                'author': jwtUtils.get_user_id(req)
            }
            await Problem.query().insert(problemObj);
            res.status(201).json({
                status: 'success',
                description: problemObj
            });
        }
        else{
            if (req.files) {
                // [TODO] delete all uploaded files in request because request is bad
                if (req.files.test_input) {
                    ;
                }
                if (req.files.test_output) {
                    ;
                }
            }
            res.status(400).json({
                status: 'failure',
                description: request.message
            });
            return;
        }
    }
    catch (ex) {
        console.log(`[ERROR]: ${ex}`);
        res.status(500).json({
            status: 'failure',
            description: 'Internal server error'
        })
    }
}

async function get_problems(req, res) {
    res.json({
        data: 'get_problems'
    });
}

async function get_problem_by_id(req, res) {
    res.json({
        data: `get prob by id ${req.params.id}`
    })
}

module.exports = {
    add_problem,
    get_problems,
    get_problem_by_id
}