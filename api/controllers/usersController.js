const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
            res.status(201).json({ message: 'User created successfuly.' })
        } catch(err) {
            console.error(err);
            if (err.code == 'P2002') {
                return res.status(409).json({ message: 'This username is already taken.'});
            }
            res.status(500).json({ message: 'An error has occured while creating the user.'});
        }
    }
}

module.exports = usersController;
