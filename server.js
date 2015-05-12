/*
 * Module dependencies
 */
require("./environment")
var express    = require("express");
var mongoose   = require("mongoose").connect(process.env.MONGO);
var bodyParser = require("body-parser");

var app = express()
var port = process.env.PORT

// Midleware
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.listen(port);
console.log("Listening on port: " + port);
