const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: 'Authorization failed: no token provided' })
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token'})
        }
        req.user = { id: data.id };
        next()
    })
}
