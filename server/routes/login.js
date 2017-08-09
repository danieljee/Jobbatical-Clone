var authController = require('../controllers/authController')
  , middlewares = require('../middlewares');

module.exports = function loginRoute(router){
  router.all('/', middlewares.notLoggedIn);
  router.post('/', authController.login);
  //necessary?
  router.get('/', function(req, res, next){
    next();
  });
};
