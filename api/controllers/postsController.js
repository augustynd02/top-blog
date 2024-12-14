const postsController = {
    getAllPosts: async (req, res) => {
        res.send('all posts')
    },
    getPostById: async (req, res) => {
        res.send('one post')
    }
}

module.exports = postsController;
