module.exports = function (db,app){
    app.post('/api/addchannel', function(req,res){
        if (!req.body){
            return res.sendStatus(400);
        }
        
        let newChannel = {
            'channelname':req.body.channelname,
            'groupId':req.body.groupId
        }
        console.log("sdf",req.body)
        const collection = db.collection('channels')
        //check for duplicate id
        collection.find({'channelname':newChannel.channelname}).count((err,count)=>{
            if(count==0){
                collection.insertOne(req.body, (err, dbres)=> {
                    if(err) throw err;
                    collection.find({}).toArray((err,data)=>{
                        if(err) throw err;
                        res.send(data);
                    });
                });
            } else {
                res.send({ok:false, err:'Duplicate channel name.'})
            }
        });
    });
}