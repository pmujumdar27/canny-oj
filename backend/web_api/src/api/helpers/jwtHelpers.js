const jwt = require("jsonwebtoken");

function jwtTokens({
    id,
    username,
    email
}) {
    const user = {
        id,
        username,
        email
    };
    const accessToken = jwt.sign(
        user,
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '600m'}
    );
    const refreshToken = jwt.sign(
        user,
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1200m'}
    );
    return ({
        accessToken,
        refreshToken
    })
}

function parse_user(token, app_secret) {
    try {
        const user_obj = jwt.verify(token, app_secret);
        return user_obj;
    }
    catch (ex) {
        return false;
    }
}

function get_user(req) {
    let app_secret = process.env.ACCESS_TOKEN_SECRET;

    const Authorization = req.headers.authorization;

    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        return parse_user(token, app_secret);
    }
    
    return false;
}

function get_user_id(req) {
    const curUser = get_user(req);
    if (curUser) {
        return curUser.id;
    }
    return false;
}

function get_payload(req) {
    let app_secret = process.env.ACCESS_TOKEN_SECRET;

    const Authorization = req.headers.authorization;

    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        return jwt.verify(token, app_secret);
    }

    return false;
}

module.exports = {
    jwtTokens,
    get_user_id,
    get_payload,
    get_user
};