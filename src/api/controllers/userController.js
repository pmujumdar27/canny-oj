const User = require('../models/user');
const missing_keys = require('../helpers/object');
const bcrypt = require('bcryptjs');
const jwtTokens = require('../helpers/jwtHelpers');

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

async function get_user_by_username(req, res) {
    try {
        const username = req.params.username;
        let [cur_user] = await User.query().where('username', username);
        if (cur_user) {
            let res_obj = {
                username: cur_user.username,
                email: cur_user.email,
                created_at: cur_user.created_at
            };
            res.status(200).json({
                status: 'success',
                data: res_obj
            })
        }
        else{
            res.status(404).json({
                status: 'failure',
                description: 'User not found'
            })
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

async function login(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const [userObj] = await User.query().where('email', email);
        if (userObj) {
            const validPassword = await bcrypt.compare(password, userObj.password);
            if (!validPassword) {
                res.status(401).json({
                    status: 'failure',
                    description: 'Invalid Password'
                })
            }
            else{
                let tokens = jwtTokens({
                    id: userObj.id,
                    username: userObj.username,
                    email: userObj.email
                })
                res.cookie('refreshToken', tokens.refreshToken, {httpOnly:true});
                res.status(200).json({
                    status: 'success',
                    tokens: tokens
                })
            }
        }
        else{
            res.status(404).json({
                status: 'failure',
                description: 'User not found'
            })
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

module.exports = {
    add_user,
    get_user_by_username,
    login
}