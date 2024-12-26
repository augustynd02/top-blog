const postsController = require('../controllers/postsController')
const { Router } = require('express');
const postsRouter = Router();

// Default path: /api/posts
postsRouter.get('/', postsController.getAllPosts);
postsRouter.post('/', postsController.createPost);
postsRouter.get('/:post_id', postsController.getPostById);
postsRouter.put('/:post_id', postsController.editPost);

module.exports = postsRouter;
