require('dotenv').config();
const express = require('express');
const path = require("node:path");

const postsRouter = require('./routes/postsRouter');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/posts', postsRouter);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => console.log("Listening on port 3000..."));
