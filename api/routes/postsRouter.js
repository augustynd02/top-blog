const postsController = require('../controllers/postsController')
const { Router } = require('express');
const postsRouter = Router();

// Default path: /api/posts
postsRouter.get('/', postsController.getAllPosts);
postsRouter.get('/:post_id', postsController.getPostById);

module.exports = postsRouter;
