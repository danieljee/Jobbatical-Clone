var authMiddleware = require('../middlewares/authMiddleware')
  , middlewares = require('../middlewares');

module.exports = function loginRoute(router){
  router.all('/', middlewares.notLoggedIn);
  router.post('/', authMiddleware.login, function(req, res){
    console.log('POST to login working');
    res.json({
      confirmation:'success',
      result: 'Login successful!'
    });
  });
  router.get('/', function(req, res, next){
    next();
  });
};
