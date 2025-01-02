const postsController = require('../controllers/postsController')
const { Router } = require('express');
const postsRouter = Router();

// Default path: /api/posts
postsRouter.get('/', postsController.getAllPosts);
postsRouter.post('/', postsController.createPost);
postsRouter.put('/:post_id', postsController.editPost);
postsRouter.delete('/:post_id', postsController.deletePost);
postsRouter.get('/tags', postsController.getAllTags);
postsRouter.get('/:post_title', postsController.getPostByTitle);

module.exports = postsRouter;
