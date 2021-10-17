var app = require('./server')
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe('Route Testing for the New User Route', function() {
    before (function() {
        console.log("Before");
    });
    after(function () {
        console.log("After");
    });

    describe("/api/userRegistration", () => {
        it("Should return with a number of inserted records if successful", (done) => {
            chai.request(app).post('/api/userRegistration').type('form').send(
                {"id": 100, 
                "username": "hrkTest",
                "email": "hrk@test.com",
                "password": "123",
                "role": 4,
                "userImage":""
            }).end((err, res) => {
                console.log(res.body)            
                res.body.should.be.a('array');
                done();
            });
        });

      
    });
});

describe('Route Testing for the new Group Route', function() {
    before(function () {
        console.log("Before");
    })

    after(function () {
        console.log("After");
    });

    describe("/api/addgroup", () => {
        it("Should return with a number of inserted records if successful", (done) => {
            chai.request(app).post('/api/addgroup').type('form').send(
                {"name": "TestingGroup"}).end((err, res) => {
                    res.body.should.be.a('object');
                    done();
            });
        });

    
    });
});

describe('Route Testing for the new Channel Route', function() {
    before(function () {
        console.log("Before");
    })

    after(function () {
        console.log("After");
    });

    describe("/api/addchannel", () => {
        it("Should return with a number of inserted records if successful", (done) => {
            chai.request(app).post('/api/addchannel').type('form').send(
                {"channelname": "TestingChannel", 
                "groupId": "TestingGroup"
            }).end((err, res) => {
                res.body.should.be.a('object')
                done();
            });
        });

       
 });
})

describe('Route Testing for getting all users Route', function() {
    before(function () {
        console.log("Before");
    })

    after(function () {
        console.log("After");
    });

    describe("/api/getAllUsers", () => {
        it("Should return with all of the records", (done) => {
            chai.request(app).get('/api/getAllUsers').type('form').end((err, res) => {
                res.body.should.be.a('array')
                done();
            });
        });
    });
});

describe('Route Testing for getting all groups Route', function() {
    before(function () {
        console.log("Before");
    })

    after(function () {
        console.log("After");
    });

    describe("/api/groups", () => {
        it("Should return with all of the records", (done) => {
            chai.request(app).get('/api/groups').type('form').end((err, res) => {
                res.body.should.be.a('array')
                done();
            });
        });
    });
});

describe('Route Testing for getting all chats Route', function() {
    before(function () {
        console.log("Before");
    })

    after(function () {
        console.log("After");
    });

    describe("/api/getchats", () => {
        it("Should return with all of the records", (done) => {
            chai.request(app).post('/api/getchats').type('form').send({}).end((err, res) => {
                res.body.should.be.a('array')
                done();
            });
        });
    });
});

describe('Route Testing for getting all channels Route', function() {
    before(function () {
        console.log("Before");
    })

    after(function () {
        console.log("After");
    });

    describe("/api/channels", () => {
        it("Should return with all of the records", (done) => {
            chai.request(app).get('/api/channels').type('form').end((err, res) => {
                res.body.should.be.a('array')
                done();
            });
        });
    });
});

describe('Route Testing for adding a user to a channel Route', function() {
    before(function () {
    });

    after(function () {
        console.log("After");
    });

    describe("/api/addUserTochannel", () => {
        it("Should add the user to the channels user array if they are not in there and return back if it was successful", (done) => {
            chai.request(app).post('/api/addUserTochannel').type('form').send(
                {"name": "ObjectId('616bd76eb97beb9ca86c6b10')", 
                "username": "testingJames"}).end((err, res) => {
                    //res.body.should.be.a('object')
                    res.body.should.have.property('ok')
                    res.body.ok.should.equal(false);
                    done();
            });
        });

     
    });
});

describe('Route Testing for remvoing a user from a channel Route', function() {
    before(function () {
    });

    after(function () {
        console.log("After");
    });

    describe("/api/removeUserFromChannel", () => {
        it("Should remove the user from the channels user array if they are in there and return back if it was successful", (done) => {
            chai.request(app).post('/api/removeUserFromChannel').type('form').send(
                {"name": "TestingChannel", 
                "username": "testingJames"}).end((err, res) => {
                    res.body.should.have.property('ok')
                    res.body.ok.should.equal(false);
                    done();
            });
        });
    });
});



// 
// describe('Route Testing for adding a chat Route', function() {
//     before(function () {
//         console.log("Before");
//     })

//     after(function () {
//         console.log("After");
//     });

//     describe("/api/addchat", () => {
//         it("Should return with ok as true if successfully added", (done) => {
//             chai.request(app).post('/api/addchat').type('form').send({
//                 "channelName": "hi",
//                 "message": "This is a test message",
//                 "username": "testingJames"
//             }).end((err, res) => {
//                 res.body.should.be.a('object')
//                 res.body.should.have.property('num');
//                 res.body.num.should.equal(1);
//                 res.body.should.have.property('ok');
//                 res.body.ok.should.equal(true);
//                 done();
//             });
//         });
//     });
// });

describe('Route Testing for the auth Route', function() {
    before(function () {
    });

    after(function () {
        console.log("After");
    });

    describe("/api/auth", () => {
        it("Should check the users credentials and if correct respond with the user object", (done) => {
            chai.request(app).post('/api/auth').type('form').send(
                {"username": "hrkTest", 
                "password": "123"}).end((err, res) => {
                    res.body.should.be.a('object')
                    res.body.email.should.equal("hrk@test.com");
                    done();
            });
        });

       
    });
});