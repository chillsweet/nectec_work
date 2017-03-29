var update = {};
var tool = require('../../helper/tool');
update.index = function(req, res , next){
  tool.shell('bash update.sh', function(err,data){

    if(!err){
      var val = data.substr(0,4);
      if(val == 'true'){
        tool.shell('bash ./system/checkdisk.sh', function(err, data){
          var val = data.substr(0,4);
          if (val == 'true') {
            res.redirect('/update/data');
          }else {
            res.redirect('/update/clear');
          }
        });

      }
      else {
        res.json({test:'false'});
      }
    }else {
      res.send(err);
    }
  });
}
update.config = function (req, res,next) {
  if (req.session.member  != undefined) {
    var fs = require('fs');
    var str  = fs.readFileSync('./automatic/time.json','utf-8');
    var obj = JSON.parse(str);
    res.render('config.html',obj);
  }else {
    res.render('index.html');
  }

}
update.changConfig = function (req, res) {
  var fs = require('fs');
  var str  = fs.readFileSync('./automatic/time.json','utf-8');
  var obj = JSON.parse(str);
  obj.condition = req.body;
  var temp = JSON.stringify(obj);
  fs.writeFile('./automatic/time.json',temp,function (err) {
    if (err) {
      console.log(err);
    }else {
      console.log("done");
    }
  });
  res.json(req.body);
}
module.exports = update;
