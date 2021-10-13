module.exports = function (db,app){
    app.post('/api/userRegistration', function(req,res){
        if (!req.body){
            return res.sendStatus(400);
        }
        let newUser = {
            'username':req.body.username,
            'password':req.body.password,
            'email':req.body.email,
            'role':req.body.role,
            'userImage':req.body.userImage,
        }

        const collection = db.collection('users')
        //check for duplicate id
        collection.find({'username':newUser.username}).count((err,count)=>{
            if(count==0){
                let newUser = {
                    'userId':count+1,
                    'username':req.body.username,
                    'password':req.body.password,
                    'email':req.body.email,
                    'role':req.body.role,
                    'userImage':req.body.userImage,
                }     
                
                collection.insertOne(newUser, (err, dbres)=> {
                    if(err) throw err;
                    collection.find({}).toArray((err,data)=>{
                        if(err) throw err;
                        res.send(data);
                    });
                });
            } else {
                res.send({ok:false, err:'Duplicate user.'})
            }
        });
    });
}