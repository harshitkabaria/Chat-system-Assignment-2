module.exports = {
    connect: function (io, PORT){
        io.on('connection', (socket)=>{
            //Log when connection request recvieved. 
            console.log('User connection on port ' + PORT + ' : ' + socket.id);
            //log when message recvied
            socket.on('message', (message)=> {
                io.emit('message', message);
            });
        });
    }
}