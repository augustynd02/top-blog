const usersController = require('../controllers/usersController');
const { Router } = require('express');
const usersRouter = Router()

usersRouter.post('/', usersController.createUser);

module.exports = usersRouter;
