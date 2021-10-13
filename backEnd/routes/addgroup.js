module.exports = function (db,app){
    app.post('/api/addgroup', function(req,res){
        if (!req.body){
            return res.sendStatus(400);
        }
        let newGroup = {
            'groupname':req.body.name,
        }

        const collection = db.collection('groups')
        //check for duplicate id
        collection.find({'groupname':newGroup.groupname}).count((err,count)=>{
            console.log(newGroup);
            if(count==0){
                collection.insertOne(newGroup, (err, dbres)=> {
                    if(err) throw err;
                    collection.find({}).toArray((err,data)=>{
                        if(err) throw err;
                         console.log(data);
                        res.send(data);
                    });
                });
            } else {
                res.send({ok:false, err:'Duplicate group.'})
            }
        });
    });
}