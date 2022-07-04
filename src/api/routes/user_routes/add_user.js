const User = require('../../models/user');
const missing_keys = require('../../helpers/object');
const bcrypt = require('bcryptjs');
const database = require('../../../../config/DatabaseConfig');

async function check_request(req) {
    const required_keys = ['username', 'email', 'password'];
    const missing = missing_keys(req.body, required_keys);
    if (missing.length > 0) {
        return Error(`Required keys not found: ${missing.join(', ')}`);
    }

    const [user] = await User.query().where('email', req.body.email);
    if (user) {
        return Error('User already exists');
    }
    return true;
}

async function add_user(req, res) {
    try{
        const request = await check_request(req);
    
        if (request === true){
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const userObj = {
                'username': req.body.username,
                'email': req.body.email,
                'password': hashedPassword
            }
            await User.query().insert(userObj);
            const curUser = await User.query().where('email', userObj.email);
            res.status(201).json(curUser);
        }
        else {
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

module.exports = add_user;