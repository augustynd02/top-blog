const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const postsController = {
    getAllPosts: async (req, res) => {
        const posts = await prisma.post.findMany();
        res.json(posts);
    },
    createPost: async (req, res) => {
        const user = await prisma.user.findUnique({
            where: {
                username: req.user.username
            }
        })
        const post = await prisma.post.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                user_id: user.id
            }
        })

        console.log(post);
    },
    getPostById: async (req, res) => {
        res.send('one post');
    },
    editPost: async (req, res) => {
        const post = await prisma.post.update({
            where: {
                id: req.body.post_id
            },
            data: {
                title: req.body.title,
                content: req.body.content
            }
        })
        console.log(post);
    },
    getAllTags: async (req, res) => {
        const tags = await prisma.tag.findMany();
        res.json(tags);
    }
}

module.exports = postsController;
