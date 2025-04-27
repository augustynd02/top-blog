const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const generateAccessToken = require('../utils/generateAccessToken');
const CustomError = require('../utils/CustomError');


const authController = {
    loginUser: async (req, res, next) => {
        const { username, password } = req.body;
        try {
            const user = await prisma.user.findUnique({
                where: { username: username }
            });

            if (!user) {
                throw new CustomError(401, 'Invalid username');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid) {
                throw new CustomError(401, 'Invalid password');
            }

            const token = generateAccessToken({ username: user.username, role_id: user.role_id})
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 604800000,
                sameSite: 'None',
                secure: true
            });
            res.status(200).json({ message: 'Login successful', user: { username: user.username, role_id: user.role_id } })
        } catch(err) {
            next(err)
        }
    },
    logoutUser: async (req, res) => {
        if (!req.cookies.token) {
            throw new CustomError(400, "No active session was found.");
        }
        console.log(req.cookies.token);
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 604800000,
        });
        res.status(205).send();
    },
    checkLogin: async (req, res) => {
        if (req.user) {
            return res.status(200).json({ message: 'Login authentication successful.', user: req.user });
        }
        res.status(401).json({ message: 'Login authentication failed'});
    }
}

module.exports = authController;
