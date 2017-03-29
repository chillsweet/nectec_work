var env = require('../env.json')
 process.env.NODE_ENV  = process.env.NODE_ENV || env['dev'];
 var mysql = require('../config/mysql');

function update(count,date){
  this.count = count;
  this.date = date;
}

update.prototype.setcount = function(count) {
  this.count = count;
};
update.prototype.setdate = function(date) {
  this.date = date;
};
update.prototype.insert = function (data,cb) {
for (var i = 0; i < data.length; i++) {
  var temp = data[i];

  mysql.query('INSERT INTO content SET ?', temp, function(err, row ){
    if(!err){
      cb({status:true});

    }else {

      cb({status:false});

    }
  });

}

};
update.prototype.getall = function (cb) {
  mysql.query('select * from content' ,function (err, row) {
    if (!err) {
      var data = {status:true, datas:row};
      cb(data)
    }
    else {
      cb({status:true});
    }
  })
};
update.prototype.Delete = function (cb) {

  if (this.count == 0 || this.date == 0) {
    cb({status:false});
  }else {
    this.getBy(this.count, this.count, function (value) {
      if (value.datas.length <= 0) {
        console.log('file emtry');
      }
      else {
        for (key of value.datas){

            mysql.query('delete from content where con_id = '+key.con_id, function (err, value) {
                if (err) {
                  console.log(err);
                }else {
                  console.log('delete data:'+key.con_id);
                }
            });

        }

      }

      cb(value);

    });

  }
};

update.prototype.getBy = function (count, date,cb) {
  var sql = 'select con_id,con_part from content WHERE DATE_SUB(CURDATE(),INTERVAL '+date+' DAY) <  con_time and con_click <= '+count;
  console.log(sql);
  mysql.query(sql,function (err, row) {
    if (!err) {
      var data={status:true, datas:row};
      cb(data);
    }else {
      console.log(err);
      cb({status:false});
    }
  });
};
update.prototype.close = function () {
  mysql.end();
};
module.exports = update;
