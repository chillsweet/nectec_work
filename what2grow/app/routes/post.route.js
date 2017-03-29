module.exports = function (app) {
  var post = require('../controllers/post.controller');
  app.get('/post',post.index);
};
