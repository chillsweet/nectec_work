var table = require('../config/con-mysql.js');
var _id =null;
var _name = null;
var _data = null;
var context = {};
var _run = null;
var _field = null;
var _where = null;
context.setContext = function (name, data, id, field){
  _name = name;
  _data = data;
  _id = id;
  _field = field;
}
context.setWhere = function(where){
  _where = _where;
}
context.setField = function(field){
  _field = field;
}
context.getContex = function(){
  return new context();
}
context.setTable = function(name){
  _name = name;
}
context.setId = function(id){
  _id = id
}
context.setData = function(data){
  _data = data;
}
context.getTable = function(){
  return table(_name);
}
context.insert = function(call){
  _run = table(_name, _data);
 _run.save(function(err, row, field){
    call(err, field);
});
}
context.update = function(call){
  _run = table(_name, _data);
  _run.set(_field,_id);
  _run.save(function(err, row, field){
    call(err, row);
  });
}
context.delete = function(call){
  _run = table(_name);
  _run.set(_field, _id);
  _run.remove(function(err, row, field){
    call(err, field);
  });
}
context.getAll = function(call){
  _run = table(_name);
  _run.find('all', function(err, row, field){
    call(err, row);
  });
}
context.query = function (sql,call){
  _run = table(_name);
  _run.query(sql, function(err, row, field){
    call(err, row);
  });
}
context.getById = function(call){
_run = table(_name);
_run.set(_field, id);
_run.read(function(err, row, field){
  call(err, field);
});
}
module.exports = context;
