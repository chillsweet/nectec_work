var express=  require('express');
var router = express.Router();

var update = require('../../controllers/update/');
var data = require('../../controllers/update/updata');
router.get('/',update.index);
router.get('/data/',data.loadData);
router.get('/clear/',data.clearData);
router.get('/config',update.config)
router.post('/config/edite',update.changConfig);
router.get('/update/getup',data.getUpdate);

module.exports = router;
