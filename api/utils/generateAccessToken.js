const jwt = require('jsonwebtoken');

const generateAccessToken = (username) => {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: 1000 * 60 * 60 * 24 * 7})
}

module.exports = generateAccessToken;
