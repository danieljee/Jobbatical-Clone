var authMiddleware = require('../middlewares/authMiddleware')
  , middlewares = require('../middlewares');

module.exports = function joinRoute(router){
  router.all('/', middlewares.notLoggedIn);
  router.post('/', authMiddleware.signUp, function(req, res){
    console.log('POST to join working');
    res.json({
      confirmation: 'success',
      result: 'Sign up successful!'
    });
  });
  router.get('/', function(req, res, next){
    next();
  });
};
