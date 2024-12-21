const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        req.user = null;
        return next()
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
        if (err) {
            req.user = null;
            return next()
        }
        req.user = { id: data.id };
        next()
    })
}

module.exports = authenticateToken;
