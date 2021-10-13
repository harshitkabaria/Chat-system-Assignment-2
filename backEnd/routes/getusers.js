module.exports = function(db,app) {
    //Route to get users from database
    app.get('/api/getAllUsers', function(req,res){
        const collection = db.collection('users');
        collection.find({}).toArray((err,data)=>{
            console.log("Hello",data);
            if(err) throw err;
            res.send(data);
        });
    });
}