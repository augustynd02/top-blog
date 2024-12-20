const jwt = require('jsonwebtoken');

const generateAccessToken = (id) => {
    return jwt.sign(id, process.env.TOKEN_SECRET, { expiresIn: 1000 * 60 * 60 * 24 * 7})
}

module.exports = generateAccessToken;
