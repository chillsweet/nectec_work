'use strict';
exports.updateDataManual = function (state,cb) {
  var tranfrom = require('./tranfrom');
  var media = require('./downloand');
  var tool = require('../helper/tool');
  var file = require('./deletefile');
  var disk = require('diskusage');
  var test;
  var clearData = require('./clearData');
  var fs  = require('fs');
  var clear =  new clearData();
  var str  = fs.readFileSync('./automatic/time.json','utf-8');
  var obj = JSON.parse(str);
  const condition = obj.condition;
  const server = obj.server;
  tranfrom.gettranfrom(function(val){
    if (val.status == 200) {
      var temp = val.datas;
      disk.check('/', function(err,info){
        if (info.free > val.size) {
          updatedate(cb,clear,temp,server,media);
        }
        else {

          if (state == 'automatic') {
              cleardata(clear,condition,cb,file);
              updatedate(cb,clear,temp,server,media);
          }else {
            console.log('clear data');
            updatedate(cb,clear,temp,server,media);
          }
        }

    });

  }

    else if (val.status == 404) {
      cb(val);
    }
    else {
      cb(val);
    }
  });

};

function cleardata(clear,condition,cb, file) {
  var watch = false;
  clear.setcount(condition.watch);
  clear.setdate(condition.date);

  clear.Delete(function (value) {
    console.log(value);
    if (value.state) {

     var part = value.datas.map((item) => {
          return '../what2grow/public/'+item.con_part;
      });

      var file  = require('./deletefile');
      var del = new file(part);
      del.removifile();
    }else {
      console.log('date delete emtry');
    }

  });

}

function updatedate(cb,clear,temp,server,media) {

    var count = 0;


    cb('update');
    for (var i = 0; i < temp.length; i++) {
      var url = server.protocol+"://"+server.host+"/"+temp[i].con_part;

      media.download(url,'../what2grow/public/video',null, function(data){
        if (data.status) {
          cb(data.status)

        }else {
          cb(data.status)
        }
      });
    }
    clear.insert(temp,function (value) {
      count++;
      if (value.status) {

        cb('insert data complete'+count);
      }else {
        cb('insert data not found');
      }
    });

}
