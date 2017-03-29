module.exports = function(app){
  var index = require('../controllers/index.controller');
  var content = require('../controllers/content.controller');
  app.get('/',index.Render);
  app.get('/update',content.checkUpdate);

};
