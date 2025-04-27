const postsController = require('../controllers/postsController')
const { Router } = require('express');
const postsRouter = Router();
const rateLimit = require('express-rate-limit');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const limiter = rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 10,
    message: 'You are sending too many comments, try again later!',
    headers: true,
});

// Default path: /api/posts
postsRouter.get('/', postsController.getAllPosts);
postsRouter.post('/', upload.single('cover'), postsController.createPost);
postsRouter.put('/:post_id', upload.single('cover'), postsController.editPost);
postsRouter.delete('/:post_id', postsController.deletePost);
postsRouter.get('/tags', postsController.getAllTags);
postsRouter.get('/:post_title', postsController.getPostByTitle);
postsRouter.get('/:post_title/comments', postsController.getComments);
postsRouter.post('/:post_title/comments', limiter, postsController.createComment);

module.exports = postsRouter;
