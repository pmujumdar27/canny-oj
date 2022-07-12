const jwt = require('jsonwebtoken');
const authUtils = require('../helpers/jwtHelpers');

function requireAuth (req, res, next) {
    try{
        const user_id = authUtils.get_user_id(req);
        if (user_id) {
            res.locals.user_id = user_id;
            next();
        }
        else {
            res.status(401).json({
                status: 'failure',
                description: 'Invalid JWT Token'
            });
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

module.exports = requireAuth;