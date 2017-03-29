
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var html = require('html');
var path = require('path');

var IsConnected = require('is-connected');
var model = require('../models/content');
var tool = require('../helper/tool');
var fs = require('fs');
module.exports = function(app, io){


var index = require('../routes/index');
var user = require('../routes/user/login');
var update = require('../routes/update/index');


app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(session({secret: 'u23j#d!0w]s',cookie: { maxAge: 60000 }}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));

app.use('/',index);
app.use('/user',user)
app.use('/update',update);
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
var state = true;
var json;
var  check = true;
const file = '../automatic/time.json';
var server = require('socket.io-client');
var client = server.connect('http://localhost:4000', {reconnect: true});
client.on('connect', function(socket) {
  console.log('socket Connected!');
  if (check) {

                try {
                      json = require(file);
                      console.log('require file config');
                }
                catch (error) {
                                console.log('readFileSync file config');
                                var str = fs.readFileSync(file,'utf-8');
                                json = JSON.parse(str);
                }
                finally{



                                console.log('run update');
                                model.getlocation(function (err, value) {

                                  if (err) {
                                    console.log(err);
                                  }else {
                                    var local = value[0].pla_code;
                                    model.getlastContent(function (err, res) {
                                      var id = res[0].id;
                                      console.log(id);
                                      var time = json["lastupdate"];

                                        client.emit('get',{date:time, location: local,id:id});

                                    });
                                  }
                                })



                }
  }
});

client.on('disconnect',function(){
  check = true;
  console.log('socket disconnect');
});

var isConnectivity = new IsConnected();


// update/automatic
/*isConnectivity.on('connected', function connected() {

    if (state) {

            try {
                  json = require(file);
                  console.log('require file config');
            }
            catch (error) {
                            console.log('readFileSync file config');
                            var str = fs.readFileSync(file,'utf-8');
                            json = JSON.parse(str);
            }
            finally{
                            console.log('run update');
                            require('../automatic')(json);
                            state = false;

            }

  }

}).on('disconnected', function disconnected() {
     state = true;

    console.log('internet not connected');

}).init('dns'); */

var count = 0;
io.on('connection',function(socket) {

  isConnectivity.on('connected', function connected() {
    //console.log('internet connect');
    socket.broadcast.emit('network',{status:true});


  	}).on('disconnected', function disconnected() {
      check = true;

      socket.broadcast.emit('network',{status:false});


  	}).init('dns');

    client.on('from', function ( value) {
    if (check) {
      var state;
      try {
        var len = value.datas.length;
        state = true;
      } catch (err) {
          state = false;
      } finally {
        socket.broadcast.emit('data',{data:value, status:state,lengths:len});

      }

    }

    })
  socket.on('request',function(value){
    console.log(value);
    try {
          json = require(file);
          console.log('require file config');
    }
    catch (error) {
                    console.log('readFileSync file config');
                    var str = fs.readFileSync(file,'utf-8');
                    json = JSON.parse(str);
    }
    finally{


      if (check) {
        check =true;

        console.log('run update');
        model.getlocation(function (err, value) {

          if (err) {
            console.log(err);
          }else {
            var local = value[0].pla_code;
            model.getlastContent(function (err, res) {
              var id = res[0].id;
              console.log(id);
              var time = json["lastupdate"];

                client.emit('get',{date:time, location: local,id:id});

            });
          }
        })


      }



    };
  })
  socket.on('update', function (data) {
    var manual = require('../automatic/updateManual');
    manual.updateDataManual('automatic', function(value){
      console.log(value);
      count=0;
       check = true;
        socket.emit('new update',value);
    })

  })
  socket.on('chang',function(val){

  })
  socket.emit('get',{status:false});
  socket.on('chat' ,function (value) {
    var val = {mas:value};
    socket.broadcast.emit('new chat',val);
    socket.emit('new chat',val);
  });
    socket.on('disconnect', function () {});
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.html')
  });
}
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error_pro.html')
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


}
