const authController = require('../controllers/authController');
const { Router } = require('express');
const authRouter = Router()

authRouter.post('/', authController.loginUser);
authRouter.get('/session', authController.checkLogin);
authRouter.delete('/session', authController.logoutUser);

module.exports = authRouter;
