var mongoose = require('mongoose');
var User = mongoose.model('User');
var Quote = mongoose.model('Quote');

module.exports = {
    login: function (req,res) {
        console.log("controller login function");
        User.find({name: req.body.name}, function(err, users){
            if(users.length < 1) {
                console.log('no user in db');
                User.create({name: req.body.name}, function(err, user){
                    console.log(err);
                    console.log("created user")
                    req.session.user = user;
                    res.json({user: req.session.user});
                })
            } else {
                console.log('i found a user');
                req.session.user = users[0];
                res.json({user: req.session.user});
            }
        })
    },

    checkSess: function (req, res) {
        if(req.session.user == undefined) {
            return res.json({user: null})
        }
        return res.json({user: req.session.user});
    },

    logout (req, res) {
        req.session.destroy();
        res.redirect('/');
    },

    // makequote: function (req, res) {
    //     console.log('controller make quote')
    //     // var newquote;
    //     // var quote = new Quote({quote: req.body.quote, _user: req.body.user});
    //     Quote.create({quote: req.body.quote, _user: req.body.user}, function(err, quote){
    //         console.log(quote, 'inside controller after making');
    //         User.findOne({_id: req.body.user}, function (err, user) {
    //             user.quotes.push(quote);
    //             console.log(user);
    //             user.save(function(err) {
    //                 if(err) {

    //                     console.log(err, 'errmagurrrd');
    //                 } else {
    //                     console.log(res.json());
    //                 }
    //             });
    //         });
    //     });
    //     // console.log(newquote, user, 'inside controller after making')
    // },

    makequote: function (req, res) {
        console.log('controller make quote')
        User.findOne({_id: req.body.user}, function (err, user) {
            var newquote = new Quote({quote: req.body.quote, _user: req.body.user});
            // console.log(newquote, 'inside controller after making');
                newquote.save(function(err) {
                    user.quotes.push(newquote);
                    console.log(user, 'after pushing quote');
                    if(err) {
                        console.log(err, 'errmagurrrd');
                    } else {
                        Quote.findOne({_id:newquote._id}).populate("_user").exec(function (err, quote){
                            if(err) {console.log(err,"error message")}
                            else { return res.json(quote)}
                        })    
                        //return res.json(newquote);
                    }
                });
        });
        // console.log(newquote, user, 'inside controller after making')
    },

    getquotes: function(req, res) {
        console.log('get all quotes from controller thing');
        Quote.find({}, function (err, quotes){
            if(err) {console.log("get quotes fail",err)}
            else { console.log("I found these quotes", quotes)}
        }).populate("_user").exec(function (err, quotes){
            if(err) {console.log("get pop quotes fail",err)}
            else {res.json({quotes:quotes})}
        })
    },

    likequote: function(req, res) {
        Quote.findOne({_id: req.params.id}, function (err, quote){
            console.log(quote)
            quote.likes++;
            quote.save( function(err){
               if(err) {console.log(err)}
               else {
                   //console.log(quote)
                   res.json(undefined)
                }
            });
        })
    },

    deletequote: function(req,res){
        Quote.remove({_id: req.params.id}, function(err){
            if(err){console.log(err)}
            res.json(undefined)
        })
        //Quote.findOne({_id: req.params.id}).remove()
    }
}
