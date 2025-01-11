class CustomError extends Error {
    constructor(statusCode = 500, message = 'Internal server error') {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = CustomError;
