const jwt = require('jsonwebtoken');

const generateAccessToken = (id) => {
    return jwt.sign({ id: id }, process.env.TOKEN_SECRET, { expiresIn: 604800000 })
}

module.exports = generateAccessToken;
