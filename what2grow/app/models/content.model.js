var db = require('../database');

exports.getAllContent = function (call) {
db.setTable('content');
db.getAll(call);
};
exports.addcontent = function (data, call) {
  db.setContext('content',data,1,'co_id');
  db.insert(call);

};
exports.Byid = function (id, call) {
  db.setTable('content');
  db.query('select * from content where con_ty_id = '+id, call);
};
exports.getUpdate = function (cb) {
  db.setTable('content');
  db.query('select con_ty_id,count(con_id) as num from content WHERE DATE_SUB(CURDATE(),INTERVAL 7 DAY) <  con_time group by con_ty_id ',cb);
};
exports.updateClick = function (id,call) {
    db.setTable('content');
    console.log(id);
    db.query('update content set con_click=con_click+1 where con_id='+id,call);
};
