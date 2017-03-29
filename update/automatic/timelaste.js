module.exports = function (json) {
  var fs = require('fs');
  //process chang lastupdate

  json.lastupdate = new Date();
  var time = JSON.stringify(json);

  fs.writeFile('./automatic/time.json',time,function (err) {
    if (err) {
      console.log(err);
    }else {
      console.log("done");
    }
  });
  fs.readFile('./automatic/time.json','utf-8',function (err, value) {
    console.log(value);
  })

};
