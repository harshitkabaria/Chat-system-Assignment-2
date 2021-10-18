module.exports = function(db,app) {
    //Route to get chats from database
    app.post('/api/getchats', function(req,res){
        chatChannel = req.body.channelname
        console.log(chatChannel);
        const collection = db.collection('chats');
        collection.find({channelname:chatChannel}).toArray((err,data)=>{
            if(err) throw err;
            res.send(data);
        });
    });
}