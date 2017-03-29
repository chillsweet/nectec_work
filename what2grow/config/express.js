var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var cookieSession = require('cookie-session');
//var sass = require('node-sass-middleware');
var validator = require('express-validator');
var session = require('express-session');
var html = require('html');

module.exports = function () {
  var app = express();
  if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
  }else {

    app.use(compression);
  }
  app.use(bodyParser.urlencoded({
   	 	extrended:true
   	 }));
  app.use(bodyParser.json());
  app.set('views','./app/views');

  app.engine('html', require('ejs').renderFile);

  // เรียก ruote เพื่อใช้ run
  /*
      Create 14-08-2016 By Piyapan Nansathid
  */
  //--------------------------------------


    require('../app/')(app);
    //require('../app/routes/index.route')(app);
    //require('../app/routes/content.route')(app);
  //---------------------------------------

  app.use(express.static('./public'));
  return app;
};
