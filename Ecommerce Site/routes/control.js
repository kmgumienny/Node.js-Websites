var express = require('express');
var router = express.Router();
var mongSetup = require('../mongooseSetup');
var seltzers = require("mongoose").model('seltzers');
var user = require("mongoose").model('user');
var purchases = require("mongoose").model('purchases');

var mongoDB = mongSetup.db;

/* GET control page */
router.get('/', function(req, res, next) {
    var loggedin = false;
    var name = 'not logged';
    // Check if user has already logged in
    if (req.session.name) {
        loggedin = true;
        name = req.session.name;
        user.findOne({
            email: req.session.email,
            password: req.session.password
        }).populate({
            path: 'purchases',
            model: 'purchases',
            populate: {
                path: 'items',
                model: 'seltzers'
            }
        }).then((someUser) => {
            // Display all transactions
            var anyTransactions = true;
            var transactions = someUser.purchases;
            console.log(someUser);
            if (transactions.length == 0) {
                anyTransactions = false;
            }

            res.render('control.hbs', {
                title: "Fizz: Seltzer Reimagined",
                isLoggedIn: loggedin,
                isTransactions: true,
                isControl: true,
                username: name,
                anyTransactions: anyTransactions,
                transactions: transactions,
            });
        });
    } else {
        res.render('control.hbs', {
            title: "Fizz: Seltzer Reimagined",
            isLoggedIn: loggedin,
            isTransactions: true,
            isControl: true,
            anyTransactions: false,
        });
    }
});

// Update user's password
router.put('/changePassword', function(req, res, next) {
    name = req.session.name;
    //data = JSON.parse(req.body)
    console.log(req.body.oldPassword);
    someUser = user.findOne({
        email: req.session.email,
        password: req.body.oldPassword,
    }).then((someUser) => {
        if (someUser) {
            someUser.password = req.body.password;
            req.session.password = req.body.password; // Store password in cookie
            someUser.save();
            res.end();
        } else {
            res.status(500)
            res.render('error', { error: "Old password is incorrect"})
        }
    });
});

module.exports = router;
