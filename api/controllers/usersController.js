const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const generateAccessToken = require('../utils/generateAccessToken');

const usersController = {
    createUser: async (req, res) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const user = await prisma.user.create({
                data: {
                    username: req.body.username,
                    password: req.body.password,
                    role_id: 1
                }
            })
            res.status(201).json({ message: 'User created successfully.' })
        } catch(err) {
            console.error(err);
            if (err.code == 'P2002') {
                return res.status(409).json({ message: 'This username is already taken.'});
            }
            res.status(500).json({ message: 'An error has occured while creating the user.'});
        }
    },
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
            res.status(200).json({ message: 'Login successful', token: token })
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = usersController;
