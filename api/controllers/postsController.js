const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const formatDate = require('../utils/formatDate');

const uploadImage = require('../utils/uploadImage');

const postsController = {
    getAllPosts: async (req, res) => {
        try {
            const posts = await prisma.post.findMany({
                include: {
                    tags: true
                }
            });
            posts.forEach(post => {
                post.created_at = formatDate(post.created_at);
            })
            res.status(200).json(posts);
        } catch (err) {
            console.error('Error fetchings posts: ', err);
            res.status(500).json({ message: 'Internal server error.' });
        }
    },
    getPostByTitle: async (req, res) => {
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
                return res.status(404).json({ message: 'Not found'});
            }
            res.status(200).json(post);
        } catch (err) {
            console.error('Error fetching post: ', err);
            res.status(500).json({ message: 'Internal server error. '});
        }
    },
    createPost: async (req, res) => {
        if (!req.user) {
            return res.status(401).json({ message: "You're not authorized to perform this operation." });
        }

        if (!req.body.title || !req.body.content) {
            return res.status(400).json({ message: "Fields must not be empty."} );
        }

        try {
            const user = await prisma.user.findUnique({
                where: {
                    username: req.user.username
                }
            })

            if (user.role_id != 2) {
                return res.status(403).json({ message: "You're forbidden from performing this operation." });
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
                return res.status(409).json({ message: 'A post with that title already exists. '});
            }

            console.error('Error: ', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    editPost: async (req, res) => {
        if (!req.user) {
            return res.status(401).json({ message: "You're not authorized to perform this operation." });
        }

        if (!req.body.title || !req.body.content) {
            return res.status(400).json({ message: "Fields must not be empty."} );
        }

        try {
            const user = await prisma.user.findUnique({
                where: {
                    username: req.user.username
                }
            })

            if (user.role_id != 2) {
                return res.status(403).json({ message: "You're forbidden from performing this operation." });
            }

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

            res.status(200).json({ message: `Post edited: ${post}`} );

        } catch (err) {
            if (err.code == 'P2002') {
                return res.status(409).json({ message: 'A post with that title already exists. '});
            }

            console.error('Error editing post: ', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

    },
    deletePost: async (req, res) => {
        if (!req.user) {
            return res.status(401).json({ message: "You're not authorized to perform this operation." });
        }

        try {
            const post = await prisma.post.delete({
                where: {
                    id: Number(req.params.post_id)
                }
            })

            res.status(200).json({ message: `Post has been deleted: ${post}`})
        } catch (err) {
            console.error('Error deleting post: ', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    getAllTags: async (req, res) => {
        try {
            const tags = await prisma.tag.findMany();
            res.status(200).json(tags);
        } catch (err) {
            console.error('Error getting tags: ', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = postsController;
