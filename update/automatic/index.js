module.exports = function (json) {
  var automatic = require('./updateManual');
  var tool = require('../helper/tool');
  var number  = tool.calculadate(new Date(), json.lastupdate);
  if (number >= 1) {
    automatic.updateDataManual('automatic',function(val){
      console.log(val);
    });
    require('./timelaste')(json);
  }else {
    console.log('update next day');
  }

};
