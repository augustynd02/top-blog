const postsController = require('../controllers/postsController')
const { Router } = require('express');
const postsRouter = Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Default path: /api/posts
postsRouter.get('/', postsController.getAllPosts);
postsRouter.post('/', upload.single('cover'), postsController.createPost);
postsRouter.put('/:post_id', upload.single('cover'), postsController.editPost);
postsRouter.delete('/:post_id', postsController.deletePost);
postsRouter.get('/tags', postsController.getAllTags);
postsRouter.get('/:post_title', postsController.getPostByTitle);

module.exports = postsRouter;
