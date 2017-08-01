var express = require('express');
var router = express.Router();
var api = require('./api');
var authManager = require('./authManager');

router.use('/api', api);

router.post('/join', authManager.signUp);
router.post('/login', authManager.login);
router.get('*', function(req, res, next) {
  res.render('index');
});

module.exports = router;
