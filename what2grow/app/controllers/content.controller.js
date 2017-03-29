

var type = require('load')('model','typeContent');
var depart = require('load')('model','partment');
var content = require('load')('model','content');
exports.index = function(req, res){
  type.getAllType(function(err, data){
  res.render('content.html',{value:data});
  })

}
exports.checkUpdate = function (req ,res) {
  content.getUpdate(function (err, value) {
    res.json(value);
  });
};
exports.getType = function (req, res) {
  type.getAllType(function(err, data){

    res.json(data);
  });
};
exports.ConByid = function (req, res, er,id) {
  console.log(id);
  content.Byid(id,function(err, data){
      if (err) {
        throw err;
      }
      else {
        res.json(data);
      }
  });
};
exports.update = function (req, res, err) {
  var id = req.params.count;
  //console.log(id);
  content.updateClick(id,function(err, data){
    console.log(data);
    res.json(data);
  });
};
exports.data = function (req, res) {
  content.getAllContent(function(err,data){
    res.json(data);
  });
};
exports.addData = function (req, res) {
  content.addcontent(req.body, function(err, data){
    res.json(req.body);
  });
};
exports.addTypeCon = function (req, res) {

  type.addtype(req.body, function(err, data){
    res.json(data);
  });
};

exports.getde = function (req, res) {
  depart.getDepart(function (err, data) {
    if (err) {
      console.error(err);
    }
    else {
      res.json({data: data});
    }
  })
};
