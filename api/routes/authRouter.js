const authController = require('../controllers/authController');
const { Router } = require('express');
const authRouter = Router()
const authenticateToken = require('../middleware/authenticateToken');

authRouter.post('/', authController.loginUser);
authRouter.get('/session', authenticateToken, authController.checkLogin);
authRouter.delete('/session', authenticateToken, authController.logoutUser);

module.exports = authRouter;
