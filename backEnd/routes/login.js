
module.exports = function(db,app){
    app.post('/api/auth', function(req, res){
        //Grab the username and password from the request.
        username = req.body.username
        password = req.body.password
        //Try to find if there is a user that has that username and password.
        const collection = db.collection('users');
        collection.findOne({username: username, password:password}, (err, user) => {
            // if(username == user.username && password == user.password){

            // }
            if (err) throw err;
            console.log(user)
            //If successful respond with the user object.
            if (user) {
                user.success = true;
                res.send(user)
            } else {
                res.send({success: false})
            }
        });
    });
}