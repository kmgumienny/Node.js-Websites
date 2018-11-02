var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var events = require("mongoose").model('events');
var user = require("mongoose").model('user');
var mongSetup = require('../mongooseSetup');
var multer = require('multer');


var mongoDB = mongSetup.db;
mongoDB.Promise = global.Promise;

const multerConfig = {
    storage: multer.diskStorage({
        destination: function(req, file, next){
            next(null, './public/uploads')
        },
        filename: function(req, file, next){
            console.log(file);
            const ext = file.mimetype.split('/')[1];
            next(null, file.fieldname + '-' + Date.now() + '.' + ext);
        }
    })
};

/* GET home page. */
router.get('/', function(req, res, next) {

            res.render('createEvent.hbs', {
                title: "Welcome to Yeat",

            });
});

router.post('/', multer(multerConfig).single('photo'), function(req, res, next){
    if (req.body.bookname &&
        req.body.time &&
        req.body.desc &&
        req.body.location &&
        req.body.capacity){

        //TODO create an event
        user.findOne({
            _id: req.session.userId,
        }).populate({
            path: 'eventsOwned',
            model: 'events'}).then((someUser) => {
            //console.log(JSON.stringify(someUser));
            var photoName;
            //console.log(req.file.filename)
            if(!req.file)
                photoName = "../uploads/default.jpeg";
            else
                photoName = "../uploads/" + req.file.filename;

            console.log("the photo name is " + photoName);

            var newEvent = new events({
                active: 1,
                name: req.body.bookname,
                date: req.body.time,
                owner: req.session.userId,
                description: req.body.desc,
                location: req.body.location,
                maxAttendance: req.body.capacity,
                image: photoName
            });
            newEvent.save().then(()=>{
                someUser.eventsOwned.push(newEvent);
                someUser.save().then((doc)=>{
                   console.log(doc);
                });
                res.redirect('/main');
                ;
            });
        })
    }
    else{
        res.render('createEvent.hbs', {
            title: "Create Event",
            message: "YOINKS THAT DON'T FLY AROUND HERE"
        });
        console.log("did not get everything");
        /*
        TODO render page again with hbs but include error message field and add that above the form
        IT is now TODONE
         */
    }
});

module.exports = router;
