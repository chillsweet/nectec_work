var mysql = require('../../config/mysql');
var model = {};

model.getUsername = (username, password, call) => {
  var sql = " select username,  password from member where username  = ? and password = ?";
  var data = [username,password];
   mysql.query(sql,data, (error, row)=>{
    if(error){
      console.log(error);
    }
    else{
      call(row);
    }
  });
};

module.exports = model;
