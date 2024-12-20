const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const generateAccessToken = require('../utils/generateAccessToken');

const authController = {
    loginUser: async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await prisma.user.findUnique({
                where: { username: username }
            });

            if (!user) {
                return res.status(401).json({ message: 'Invalid username' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            const token = generateAccessToken(user.id)
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 604800000,
            });
            res.status(200).json({ message: 'Login successful' })
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = authController;
