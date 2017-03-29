var test = {};

var tool = require('../helper/tool');

test.index =function(req ,res){
  res.render('test.html', {title:'test'});
}
test.checknetwork = function(req, res){
  tool.shell('bash update.sh', (err,data)=>{
    if (!err) {
      var val = data.substr(0,4);
      if (val == 'true') {
        res.json({status:true});
      }else {
        res.json({status:false});
      }
    }
    else {
      res.json({status:false});
    }
  });
}
test.checkspace  = function (req, res){
  tool.shell('bash ./system/checkdisk.sh',(err,data)=>{
    if (!err) {
      var val = data.substr(0,4);
      if (val == 'true') {
        res.json({status:true});
      }else {
        res.json({status:false});
      }
    }
    else {
      res.json({status:false});
    }
  });
}
test.download =  function(req, res ){
  tool.shell('bash ./system/download.sh' ,function(err, data){
    if (!err) {
      var val = data.substr(0,4);
      if (val == 'true') {
        res.json({status:true});
      }else {
        res.json({status:false});
      }
    }else {
        res.json({status:false});
    }
  });
}

test.update =  function(req, res){
    if (req.session.member  != undefined) {
      var model = require('../models/content');
      var fs = require('fs');
      var str = fs.readFileSync('./automatic/time.json', 'utf-8');
      var ob = JSON.parse(str);
      model.getlastupdate(function (err, value) {
        if (err) {
          res.send('error get last update data');
          console.log(err);
        }else {
          var lastupdate =  value[0].time;
          res.render('download.html', {last:lastupdate});
        }
      })

    }else {
      res.redirect('/');
    }


}

module.exports = test;
