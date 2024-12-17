const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const postsController = {
    getAllPosts: async (req, res) => {
        const posts = await prisma.post.findMany();
        res.json(posts);
    },
    getPostById: async (req, res) => {
        res.send('one post');
    },
}

module.exports = postsController;
