module.exports = {
    connect: function (io, PORT, db){
        io.on('connection', (socket)=>{
            //Log when connection request recvieved. 
            console.log('User connection on port ' + PORT + ' : ' + socket.id);
            //log when message recvied

            socket.on('join', (data) => {
                console.log('join ' , data);
                socket.username = data.username;
                socket.channel = data.channelname;
                socket.join(data.channelname);
                io.to(data.channelname).emit('message', {username: 'SERVER', message: `${socket.username} has joined the channel.`, messagedate: new Date().toISOString()})
            });

            socket.on('message', (message)=> {
                console.log('message ', message);
                io.to(socket.channel).emit('message', { username: socket.username, message, messagedate: new Date().toISOString() });
            });

            socket.on('leave', (data) => {
                io.to(socket.channel).emit('message', {username: 'SERVER', message: `${socket.username} has left the channel.`, messagedate: new Date().toISOString()})
                socket.leave(socket.channel);
                console.log('leave ' , data);
            });
            
            socket.on('disconnect', (data) => {
                io.to(socket.channel).emit('message', {username: 'SERVER', message: `${socket.username} has disconnected.`, messagedate: new Date().toISOString()})
                socket.leave(socket.channel);
                console.log('disconnect ' , data);
            });

        });
    }
}