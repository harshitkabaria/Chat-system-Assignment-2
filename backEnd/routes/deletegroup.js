module.exports = function(db, app, ObjectID){
    //Use route 
    app.post('/api/deletegroup', function(req,res){
        if (!req.body){
            return res.sendStatus(400);
        }
        //Get user object being deleted
        let target = req.body;
        var objectId = new ObjectID(target.groupId);
        const collection = db.collection('groups');
        //Delete user
        console.log(objectId);
        collection.deleteOne({_id: objectId}, (err, docs) => {
            if (err) throw err;
            //Get current users
            collection.find({}).toArray((err, data) => {
                if (err) throw err;
                //Return new user object.
                res.send(data);
            });
        });
    });
}