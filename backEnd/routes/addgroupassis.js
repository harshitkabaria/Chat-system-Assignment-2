module.exports = function (db,app) {
    app.post("/api/promotUsertoGroupassis", async function (req, res) {
        if (!req.body) {
            return res.sendstatus(400);
        }

        let userId = req.body.userId;
        let roleType = req.body.role;

        const collection = db.collection('users')
        //check for duplicate id
        collection.find({'userId':userId}).count((err,count)=>{
            console.log(count)
            if(count>0){
                console.log("newGroup", req.body);

                collection.updateOne({'userId':userId}, { $set: { role:roleType } },(err, dbres)=> {
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