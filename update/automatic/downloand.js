exports.download = function (url, path, time, cb) {
  var download = require('download');
  var fs = require('fs');
  download(url, path).then(() => {
    if (typeof time === "function") {
      clearInterval(time);
    }
    cb({status:true});
  },()=>{
    if (typeof time === "function") {
      clearInterval(time);
    }
    cb({status:false});
  });
};
