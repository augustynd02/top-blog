const bcrypt = require('bcryptjs');

const usersController = {
    createUser: async (req, res) => {
        const data = req.body;
        data.password = await bcrypt.hash(data.password, 10);
        console.log(data);
    }
}

module.exports = usersController;