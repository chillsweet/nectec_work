exports.getlocal = function (latitude, longitude,call) {
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+'%2C'+longitude+'&language=th';

    var request = require('request');
    request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var val =  JSON.parse(body);
      var results = getdata(val.results);
      call(results); 
     }
   });

}
function getdata(data) {
  var len  = data.length;
  var temp = data[len-2];
  var str = temp.formatted_address;
  var val = getlocation(str);
  return val;

}
function getlocation(str) {
  var current = str.substr(0,str.indexOf('ประเทศไทย'));
  return current;
}
