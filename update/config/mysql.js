var mysql = require('mysql');
var config = require('./config');
var connection = mysql.createConnection(config.mysql);


connection.connect((err)=>{
   if(err){

   }

 }
);
module.exports = connection;
