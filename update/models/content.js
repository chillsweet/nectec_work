'use strict';
const mysql  =  require('../config/mysql');
const fs = require('fs');

var model = {};

model.getAllContent =  function(call){
  const sql = "select con_id, con_name, con_part, con_time from content";
  mysql.query(sql, function(err, row){
    if (!err) {
        call(null, row);
    }
    else {
      call(err, null)
    }
  });
}

model.getlocation = function(cb){
var str = fs.readFileSync('./public/location.json','utf-8');
var ob = JSON.parse(str);
 mysql.query('select pla_code from nat_place where pla_name = ?',ob.place,cb);
}
model.getlastupdate = function (cb) {
  mysql.query('select max(con_time) as time from content', cb);
}
model.getlastContent = function(cb){

  mysql.query('select max(con_id_sev) as id from content',cb);
}
model.getpath = function (id, cb) {
  var sql = 'select con_part from content where con_id = ?';
  mysql.query(sql,[id],cb);
}
model.delete = (id, call) => {
  const sql = 'delete from content where con_id = ?';
  mysql.query(sql,[id], function(err, row){
    if (!err) {
        call(null, true);
    }
    else {
      call(err, null)
    }
  });
}
module.exports = model;
