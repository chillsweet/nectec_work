module.exports = function(app){
  var config  = require('../controllers/location.controller')
  app.route('/loacation')
  .post(config.Getloacations);
};
