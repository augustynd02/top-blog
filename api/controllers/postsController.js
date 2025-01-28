const CustomError = require('../utils/CustomError');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const formatDate = require('../utils/formatDate');

const uploadImage = require('../utils/uploadImage');

const postsController = {
    getAllPosts: async (req, res, next) => {
        try {
            const posts = await prisma.post.findMany({
                include: {
                    tags: true
                }
            });

            if(!posts || posts.length === 0) {
                throw new CustomError(404, 'No posts found.');
            }

            posts.forEach(post => {
                post.created_at = formatDate(post.created_at);
            })

            res.status(200).json(posts);
        } catch (err) {
            next(err);
        }
    },

    getPostByTitle: async (req, res, next) => {
        try {
            const post = await prisma.post.findUnique({
                where: {
                    title: req.params.post_title
                },
                include: {
                    tags: true
                }
            })
            if (post == null) {
                throw new CustomError(404, `Post ${req.params.post_title} was not found.`);
            }

            post.created_at = formatDate(post.created_at);

            res.status(200).json(post);
        } catch (err) {
            next(err);
        }
    },

    createPost: async (req, res, next) => {
        if (!req.user) {
            throw new CustomError(401, "You're not authorized to perform this operation.");
        }

        if (!req.body.title || !req.body.content) {
           throw new CustomError(400, 'Fields must not be empty.')
        }

        try {
            const user = await prisma.user.findUnique({
                where: {
                    username: req.user.username
                }
            })

            if (user == null) {
                throw new CustomError(404, `User ${req.user.username} was not found on the server.`);
            }

            if (user.role_id != 2) {
                throw new CustomError(403, "You're forbidden from performing this operation.");
            }

            req.body.tags = JSON.parse(req.body.tags);

            const post = await prisma.post.create({
                data: {
                    title: req.body.title,
                    content: req.body.content,
                    cover_url: 'asd',
                    user_id: user.id,
                    tags: {
                        connectOrCreate: req.body.tags.map(tag => ({
                            where: { name: tag.name },
                            create: { name: tag.name }
                        }))
                    }
                }
            })

            // After the post is successfuly created, upload the image to the cloud and update post with url
            const image = await uploadImage(req.file.buffer)
            const updatedPost = await prisma.post.update({
                where: {
                    id: post.id
                },
                data: {
                    cover_url: image.url
                }
            })

            res.status(201).json({ message: `Post created: ${updatedPost}`} );

        } catch (err) {
            if (err.code == 'P2002') {
                next(new CustomError(409, 'A post with this title already exists.'));
            }

            next(err);
        }
    },
    editPost: async (req, res, next) => {
        if (!req.user) {
            throw new CustomError(401, "You're not authorized to perform this operation.");
        }

        if (!req.body.title || !req.body.content) {
            throw new CustomError(400, 'Fields must not be empty.')
        }

        try {
            const user = await prisma.user.findUnique({
                where: {
                    username: req.user.username
                }
            })

            if (user == null) {
                throw new CustomError(404, `User ${req.user.username} was not found on the server.`);
            }

            if (user.role_id != 2) {
                throw new CustomError(403, "You're forbidden from performing this operation.");
            }

            req.body.tags = JSON.parse(req.body.tags);

            const post = await prisma.post.update({
                where: {
                    id: parseInt(req.params.post_id)
                },
                data: {
                    title: req.body.title,
                    content: req.body.content,
                    user_id: user.id,
                    tags: {
                        connectOrCreate: req.body.tags.map(tag => ({
                            where: { name: tag.name },
                            create: { name: tag.name }
                        }))
                    }
                }
            })

            if (req.file) {
                const image = await uploadImage(req.file.buffer)
                const updatedPost = await prisma.post.update({
                    where: {
                        id: post.id
                    },
                    data: {
                        cover_url: image.url
                    }
                })
            }

            res.status(200).json({ message: `Post edited: ${post}`} );

        } catch (err) {
            if (err.code == 'P2002') {
                next(new CustomError(409, 'A post with this title already exists.'));
            }

            next(err);
        }

    },
    deletePost: async (req, res, next) => {
        if (!req.user) {
            throw new CustomError(401, "You're not authorized to perform this operation.");
        }

        try {
            const post = await prisma.post.delete({
                where: {
                    id: Number(req.params.post_id)
                }
            })

            if (post == null) {
                throw new CustomError(404, `Post ${req.user.username} was not found.`);
            }

            res.status(200).json({ message: `Post has been deleted: ${post}`})
        } catch (err) {
            next(err);
        }
    },
    getAllTags: async (req, res, next) => {
        try {
            const tags = await prisma.tag.findMany();

            if (tags == null || tags.length === 0) {
                throw new CustomError(404, "Tags not found");
            }
            res.status(200).json(tags);
        } catch (err) {
            next(err);
        }
    },
    getComments: async (req, res, next) => {
        try {
            const post = await prisma.post.findUnique({
                where: {
                    title: req.params.post_title
                },
                orderBy: {
                    created_at: 'desc'
                }
            });

            if (post == null) {
                throw new CustomError(404, `Post ${req.params.post_title} was not found.`);
            }

            const comments = await prisma.comment.findMany({
                where: {
                    post_id: post.id
                },
                include: {
                    user: true
                }
            })

            comments.forEach(comment => {
                comment.created_at = formatDate(comment.created_at);
            })
            const updatedComments = comments.map(comment => ({ ...comment, user: comment.user.username }))

            return res.status(200).json(updatedComments);
        } catch (err) {
            next(err);
        }
    },
    createComment: async (req, res, next) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    username: req.body.username
                }
            })

            if (user == null) {
                throw new CustomError(404, `User ${req.user.username} was not found on the server.`);
            }

            const comment = await prisma.comment.create({
                data: {
                    content: req.body.content,
                    post_id: req.body.post_id,
                    user_id: user.id
                }
            })

            return res.status(201).json(comment);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = postsController;
