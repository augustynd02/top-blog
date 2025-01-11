require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require("node:path");
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

// TODO: configure CORS for deployment
app.use(cors({
    origin: 'http://localhost:5173',
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
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal server error'
    });
})

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => console.log("Listening on port 3000..."));
