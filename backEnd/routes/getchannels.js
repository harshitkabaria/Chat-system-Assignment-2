module.exports = function(db,app) {
    //Route to get groups from database
    app.get('/api/channels', function(req,res){
        const collection = db.collection('channels');
        collection.find({}).toArray((err,data)=>{
            if(err) throw err;
            res.send(data);
        });
    });
}