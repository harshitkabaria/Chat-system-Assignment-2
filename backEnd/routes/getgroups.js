module.exports = function(db,app) {
    //Route to get groups from database
    app.get('/api/groups', function(req,res){
        const collection = db.collection('groups');
        collection.find({}).toArray((err,data)=>{
            if(err) throw err;
            res.send(data);
        });
    });
}