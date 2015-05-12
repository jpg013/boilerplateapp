/*
 * Module dependencies
 */
var express    = require("express");
var mongoose   = require("mongoose").connect("mongodb://localhost:27017/projectx?auto_reconnect or= true&maxPoolSize or= 10");

var app = express()
var port = 3000

app.use(express.static(__dirname + '/public'));

// ROUTES
// ==============================================

app.route('/login')
    .get(function(req, res) {
        res.send('this is the login form');
    })
    .post(function(req, res) {
        console.log('processing');
        res.send('processing the login form!');
    });

app.listen(port);
console.log("Listening on port: " + port);
