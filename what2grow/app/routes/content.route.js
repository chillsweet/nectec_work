module.exports = function(app){
  var content = require('../controllers/content.controller');
  app.get('/content', content.index);
  app.get('/content/data',content.data);
  app.route('/content/data/:id')
  .get(content.data);
  app.post('/add',content.addData);
  app.param('id',content.ConByid);
  app.get('/data', content.data);
  app.get('/depart',content.getde);
  app.get('/content/update/:count',content.update);
  app.route('/type')
  .get(content.getType)
  .post(content.addTypeCon);

};
