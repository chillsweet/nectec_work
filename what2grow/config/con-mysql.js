module.exports = function(table, data){

  var mysqlModel = require('mysql-model');
  var config = require('./system/config.json')
  var MyAppModel = mysqlModel.createConnection(config['database']);
  
  var myTble = MyAppModel.extend({
    tableName: table,
});

  var typeCheck = require('type-check').typeCheck;
  if(typeCheck("Object",data) && Object.keys(data).length > 0 ){
    var run = new myTble(data);
      return run;
  }else{
    run = new myTble();
    return run;
  }

};
