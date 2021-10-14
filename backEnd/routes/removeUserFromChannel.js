module.exports = function (db,app,ObjectID) {
    app.post("/api/removeUserFromChannel", async function (req, res) {
        console.log("called")
        
        if (!req.body) {
            return res.sendstatus(400);
        }
        console.log("new api",req.body);
        let userId = ObjectID(req.body.userId);
        let channelId = ObjectID(req.body.channelId);
        const collection = db.collection('channels')
        //check for duplicate id
        collection.find({'_id':channelId}).count((err,count)=>{
            console.log(count)
            if(count>0){
                console.log("newGroup", userId,channelId);

                collection.updateOne({'_id':channelId}, { $pull: { users:userId } },(err, dbres)=> {
                    console.log(dbres);
                    if(err) throw err;
                    collection.find({}).toArray((err,data)=>{
                        if(err) throw err;
                        // console.log(data);
                        res.send(data);
                    });
                });
            } else {
                res.send({ok:false, err:'user already exits in channel.'})
            }
        });
    });
}                                                                                           














