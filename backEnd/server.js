const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http').createServer(app);
const server = require('./listen.js');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const port = process.env.PORT || 3000;
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:4200",
        methods: ['GET','POST']
    }
});
const listen = require('./listen');
const socket = require('./sockets');
const mongoUrl = 'mongodb://localhost:27017'
//const loadUsers = require('./data/userData');
const path = require('path');

//Cors
app.use(cors())

server.listen(http, port);

module.exports = app;