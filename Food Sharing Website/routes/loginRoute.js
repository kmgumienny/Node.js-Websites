var express = require('express');
var router = express.Router();
var mongSetup = require('../mongooseSetup');
var events = require("mongoose").model('events');
var user = require("mongoose").model('user');
var User = mongSetup.user;


var mongoDB = mongSetup.db;
mongSetup.Promise = global.Promise;

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.userId){
        res.redirect('/main')
    }else{
    res.render('login.hbs', {
        title: "Welcome to Yeat",
    });
    }
});

module.exports = router;
