var express = require('express');
var router = express.Router();

var index = require('../controllers/');
var logout = require('../controllers/logout');
var test = require('../controllers/test');
var content =require('../controllers/content');

router.get('/',index);
router.get('/logout', logout.index);
router.get('/test', test.index);
router.get('/test/checknetwork', test.checknetwork);
router.get('/test/checkspace', test.checkspace);
router.get('/test/download', test.download);
router.get('/test/update', test.update);
router.get('/data/content', content.getcontent);
router.post('/data/content/delete', content.Remove);

module.exports = router;
