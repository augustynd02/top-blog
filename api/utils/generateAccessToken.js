const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign({ user: user }, process.env.TOKEN_SECRET, { expiresIn: 604800000 })
}

module.exports = generateAccessToken;
