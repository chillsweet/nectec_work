module.exports = function(app){
  var config  = require('../controllers/config.controller');
  app.get('/config',config.index);
};
