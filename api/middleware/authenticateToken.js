const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.cookies.token;

    if (token == null) {
        req.user = null;
        return next()
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
        if (err) {
            req.user = null;
            return next()
        }
        req.user = { username: data.user.username, role_id: data.user.role_id };
        next()
    })
}

module.exports = authenticateToken;
