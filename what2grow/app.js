process.env.NODE_ENV  = process.env.NODE_ENV || 'development';
var express  = require('./config/express');
var https = require('https');
//var mysql  = require('./config/con-mysql');
var app = express();
//var db = mysql();
var count = 0;

//var ping = require('./check_update');

app.listen(8080);
console.log('Run by port 8080');
