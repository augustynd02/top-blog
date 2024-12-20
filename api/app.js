require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require("node:path");

const postsRouter = require('./routes/postsRouter');
const usersRouter = require('./routes/usersRouter');

const app = express();

// TODO: configure CORS for deployment
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => console.log("Listening on port 3000..."));
