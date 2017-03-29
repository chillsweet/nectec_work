var express = require('express');
var router = express.Router();

var user = require('../../controllers/user/login');
var dashboard = require('../../controllers/user/dashboard');
router.post('/login',user.login);
router.get('/',dashboard.index);
router.post('/location',dashboard.location);

module.exports = router;
