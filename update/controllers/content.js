var model = require('../models/content');
var fs = require('fs');
var content = {};

content.getcontent = function(req, res){
  model.getAllContent(function(err, result){
      if(err == null){
        res.json(result);
      }else {
        console.error(err);
      }
  });
};

content.Remove = function(req, res){
  var id = req.body;
  for (var i = 0; i < id.length; i++) {
   model.delete(id[i],function(err, data){
      if (err == null) {
        console.log(data);
      }else {
        console.error(err);
      }
    });
    model.getpath(id[i],function (err, value) {
      if (err) {
          console.log(err);
      }else {
        if (value.length > 0) {
          var file =  value[0].con_part;
          var path = '../what2grow/public/'+file;
          fs.unlink(path,function (err) {
            if (err) {
              console.log(err);
            }else {
              console.log('donde');
            }
          });
        }
      }

    })
  }
  res.json(req.body);
}
module.exports = content;
