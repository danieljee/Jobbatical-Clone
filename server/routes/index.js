var express = require('express');
var router = express.Router();
var api = require('./api');
var signUpManager = require('../util/signUpManager');

/* GET home page. */
router.route('join').post(signUpManager);
router.use('/api', api);

router.get('*', function(req, res, next) {
  res.render('index');
});

module.exports = router;
