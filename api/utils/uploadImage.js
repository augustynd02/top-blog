const cloudinary = require('cloudinary').v2;

const uploadImage = async (buffer) => {
    try {
        const response = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: 'image'
                },
                (error, result) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(result)
                    }
                }
            ).end(buffer);
        });
        return response;
    } catch (err) {
        return err;
    }
}

module.exports = uploadImage;
