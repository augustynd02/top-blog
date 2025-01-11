const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const CustomError = require('../utils/CustomError');
const prisma = new PrismaClient();

const usersController = {
    createUser: async (req, res, next) => {
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
            if (err.code == 'P2002') {
                next(new CustomError(409, 'This username is already taken.'));
            }
            next(err);
        }
    },
}

module.exports = usersController;
