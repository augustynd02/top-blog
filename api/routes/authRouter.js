const authController = require('../controllers/authController');
const { Router } = require('express');
const authRouter = Router()
const authenticateToken = require('../middleware/authenticateToken');

authRouter.post('/login', authController.loginUser);
authRouter.get('/check-login', authenticateToken, authController.checkLogin);
authRouter.post('/logout', authenticateToken, authController.logoutUser);

module.exports = authRouter;
