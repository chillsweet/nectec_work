'use strict';
var update = {};
var tool = require('../../helper/tool');
update.loadData = function (req, res) {
  console.log('update data');
  res.render('update.html')
}
update.clearData = function(req, res){
  console.log('clear data');
  res.render('clear.html');
}
update.getUpdate = (req, res) => {
  tool.shell('bash ./system/download.sh', (err, data) =>{
    res.send(data);
  });
}

module.exports = update;
