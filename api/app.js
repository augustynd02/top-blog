require('dotenv').config();
const express = require('express');
const path = require("node:path");

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => res.send('test'));

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => console.log("Listening on port 3000..."));
