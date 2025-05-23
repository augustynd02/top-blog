require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const authenticateToken = require('./middleware/authenticateToken');

const postsRouter = require('./routes/postsRouter');
const usersRouter = require('./routes/usersRouter');
const authRouter = require('./routes/authRouter');

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
    headers: true,
});
app.use(limiter);

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(authenticateToken)
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next()
})

app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    console.error(`ERROR: ${req.method} ${req.url}`, {
        user: req.user ? req.user.username : 'Unauthenticated user',
        body: req.body,
        error: err.stack
    });
    res.status(err.statusCode).json({
        success: false,
        status: err.statusCode || 500,
        message: err.message || 'Internal server error',
    });
});

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => console.log("Listening on port 3000..."));
