var authMiddleware = require('../middlewares/authMiddleware')
  , middlewares = require('../middlewares');

module.exports = function joinRoute(router){
  router.all('/', middlewares.notLoggedIn);
  //authMiddleware should be removed. Either put the logic here as route handler or in controllers.
  router.post('/', authMiddleware.signUp, function(req, res){
    res.json({
      confirmation: 'success',
      result: 'Sign up successful!'
    });
  });
  router.get('/', function(req, res, next){
    next();
  });
};
