var db =require('../database');

exports.getAllType = function (call) {
db.setTable('type_content');
db.getAll(call);
};
exports.addtype = function (data,call) {
  //console.log(data);
  db.setTable('type_content');
  db.setData(data);
  db.insert(call);
};
