exports.gettranfrom = function (cb) {

  var wget = require('wget');
  var dateFormat = require('dateformat');
  var config = require('./config.json');
  var location = require('../public/location.json');
  var fs  = require('fs');
  var str = fs.readFileSync('./automatic/time.json');
  var ob = JSON.parse(str);
  var model = require('../models/content');

  model.getlocation(function (err, value) {
    if (err) {
      console.log(err);
    }else {
      var local = value[0].pla_code;
      var id = null;
    }

    model.getlastContent(function (err, res) {
      if (err) {
        console.log(err);
        id = 0;
      }else {
        if (res.length == 0) {
          id = 0;
        }else {
          id = res[0].id;

          config.server.path = '/data/'+local+'/'+ob.lastupdate+'/'+id;


          var req = wget.request(config.server, function(res) {
              var content = '';
              if (res.statusCode === 200) {
                  res.on('error', function(err) {
                    console.log('res error');
                      console.log(err);
                  });
                  res.on('data', function(chunk) {
                      content += chunk;
                  });
                  res.on('end', function() {
                    var obj = JSON.parse(content);
                     obj.status = 200;
                     obj.message ='ok'
                    cb(obj);
                  });
              } else {
                 var obj = {};
                 obj.status = 404;
                 obj.message ='Not Found';
                 cb(obj);
              }
          });
          req.end();
          req.on('error', function(err) {
            var obj = {};
            console.log(err);
            obj.status = 500;
            obj.message ='Server Down';
            cb(obj);
          });

        }
        //end else chedk length
      }
      //enf else model getlastContent
    })
    //end model getlastContent




  });
  //end model get location

};
