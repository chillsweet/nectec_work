var type = require('load')('model','typeContent');
var content = require('load')('model','content');
exports.Render = function (req, res) {
  type.getAllType(function(err, data){
    content.getUpdate(function (err, types) {
      if (err) {
        console.log(err);
      }else {
        res.render('index.html',{value:data,type:types});
      }
    });


  });

};
