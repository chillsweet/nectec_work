exports.checktool = function (str,call) {

    call(str);
  }

exports.shell = function (str, call) {

    var exec = require('child_process').exec;
    exec(str, function(err, stdout, stderr){
      if (!err) {
        call(null , stdout)
      }else {
        call(err, null)
      }
    });

};

exports.downloadfile = function(url,part,call){
  var download = require('download');
  var fs = require('fs');
  download(url, part).then(() => {
    call({status:true});
  },()=>{
    console.log('error');
    call({status:false});
  });
}

exports.calculadate = function (start, end) {
  var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  var firstDate = new Date(start);
  var secondDate = new Date(end);
  var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
  return diffDays;
};
exports.datenow = function () {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!

  var yyyy = today.getFullYear();
  if(dd<10){
    dd='0'+dd
  }
  if(mm<10){
      mm='0'+mm
    }
  var today = dd+'-'+mm+'-'+yyyy;
  return today;
};
