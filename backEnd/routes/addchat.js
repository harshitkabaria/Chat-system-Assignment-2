module.exports = function (db,app){
    app.post('/api/addchat', function(req,res){
        console.log(req.body)
        if (!req.body){
            return res.sendStatus(400);
        }
        let newChat = {
            'channelname':req.body.channelname,
            'username':req.body.username,
            'message':req.body.message,
            'messagedate':req.body.messagedate,
            'image':req.body.image,
        }
        chatChannel = req.body.channelname
        const collection = db.collection('chats')
        //append to chats table
        collection.insertOne(newChat, (err, dbres)=> {
            if(err) throw err;
            collection.find({channelname:chatChannel}).toArray((err,data)=>{
                if(err) throw err;
                res.send(data);
            });
        });

    });
}