const jwt = require('jsonwebtoken');

function requireAuth (req, res, next) {
    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            res.status(401).json({
                status: 'failure',
                description: 'token missing'
            })
        }
        else {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if(err) {
                    res.status(403).json({
                    status: 'failure',
                    description: err
                    })
                }
                else {
                    res.locals.user = user;
                    next();
                }
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

module.exports = requireAuth;