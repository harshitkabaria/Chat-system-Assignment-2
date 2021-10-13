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
app.use(express.json());
app.use(express.urlencoded({extended: true}))

MongoClient.connect(mongoUrl, {maxPoolSize:10, useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
    if (err) {return console.log(err)}
    const dbName = 'assignment2';
    const db = client.db(dbName);
    console.log('Database created.');
    //db.createCollection('users');
    // db.createCollection('roles');
    // db.createCollection('groups');
    // db.createCollection('channels');
    // db.createCollection('chats');


    //loadUsers()
    //User Routes
    require('./routes/login.js')(db, app); //Auth
    require('./routes/getusers.js')(db,app);
    require('./routes/adduser.js')(db, app);
   // require('./routes/deleteuser.js')(db, app, ObjectID);
    // //Group Routes
    require('./routes/getgroups')(db,app);
   require('./routes/addgroup')(db,app);
   require('./routes/deletegroup')(db,app, ObjectID);
    // require('./routes/deleteuserfromgroup')(db,app, ObjectID);
    // require('./routes/addusertogroup')(db,app);
    // //Channel Routes
    require('./routes/getchannels.js')(db,app);
   require('./routes/addchannel')(db,app);
   require('./routes/addgroupassis')(db,app);
  //  require('./routes/deletechannel')(db,app, ObjectID);
    // require('./routes/deletegroupfromchannel')(db,app, ObjectID);
    // require('./routes/addgrouptochannel')(db,app);
    // //Chat Routes
    // require('./routes/getchats')(db,app);
    // require('./routes/addchat')(db,app);
    //Image Routes 
    //require('./routes/addImage')(db,app);
    server.listen(http, port);
  //  socket.connect(io, port, db);
    
});


module.exports = app;