var db  =  require('../database');
exports.getParent = function (la, lo, call) {
  db.setTable('nat_place');
  var latitude = la.toString();
  var longitude = lo.toString();

  latitude = latitude.substring(0,latitude.indexOf('.')+4);
  longitude = longitude.substring(0,longitude.indexOf('.')+4);
  console.log(latitude);
  console.log(longitude);
  //db.query('select * from nat_place',call);
  db.query('select * from nat_place where pla_code IN (select pla_parent from nat_place where pla_code IN (select pla_parent from nat_place where pla_longitude ='+longitude+' and  pla_latitude ='+latitude+'))',call);

};
exports.saveFile = function (datas,call) {
  var file = './public/data.json';
  var jsonfile = require('jsonfile');
  jsonfile.writeFile(file,datas);
  call({status:'sucess', data:datas});
};
