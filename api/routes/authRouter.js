const authController = require('../controllers/authController');
const { Router } = require('express');
const authRouter = Router()

authRouter.post('/login', authController.loginUser);

module.exports = authRouter;
