var authController = require('../controllers/authController')
  , middlewares = require('../middlewares');

module.exports = function joinRoute(router){
  router.all('/', middlewares.notLoggedIn);
  //authMiddleware should be removed. Either put the logic here as route handler or in controllers.
  router.post('/', authController.signUp);
  //necessary?
  router.get('/', function(req, res, next){
    next();
  });
};
