const cloudinary = require('cloudinary').v2;

const uploadImage = async (path) => {
    try {
        const result = await cloudinary.uploader.upload(path);
        console.log(result);
    } catch (err) {
        console.error(err);
    }
}

module.exports = uploadImage;
