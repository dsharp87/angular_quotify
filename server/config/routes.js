var users = require('./../controllers/userscontroller');
var path = require('path');  // need path for catch all route to work

module.exports = function(app) {
    app.post('/login', function(req, res) {
        console.log("routes", req.body);
        users.login(req, res);
    });

    app.get('/checksess', function (req, res) {
        users.checkSess(req, res);
    })

    app.get('/logout', function(req, res) {
        users.logout(req, res);
    })

    app.post('/makequote', function(req, res) {
        console.log(req.body, 'routes hit');
        users.makequote(req, res);
    })

    app.get('/getquotes', function(req,res){
        console.log('get quotes routes hit');
        users.getquotes(req, res);
    })

    app.post('/deletequote/:id', function(req,res){
        console.log('hit delete route', req.params)
        users.deletequote(req,res)
    })

    app.post('/likequote/:id', function(req,res){
        console.log('hit like route', req.params)
        users.likequote(req,res)
        
    })


    
    app.all("**", (req, res) => {     //this route is so that if you type something in the URL bar it will go to an angular route after trying all express routes
        res.sendFile(path.resolve("./client/dist/index.html")) 
    });




}
