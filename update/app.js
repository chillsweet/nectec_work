var env = require('./env.json')
 process.env.NODE_ENV  = process.env.NODE_ENV || env['dev']
var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('key.pem', 'utf8');
var certificate = fs.readFileSync('cert.pem', 'utf8');
var express = require('express');
var app = express();
var normalizePort = require('./helper/normalizePort')
var http  = require('http');
var credentials = {key: privateKey, cert: certificate};
var port = normalizePort(process.env.PORT || '3000');
app.set('port',port);
var server  = https.createServer(credentials, app);
var io = require('socket.io')(server);
require('./config/express')(app,io);
server.listen(port);
console.log('application running listen port : '+port);
