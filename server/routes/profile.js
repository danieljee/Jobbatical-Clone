var middlewares = require('../middlewares');

module.exports = function profileRoute(router){
  router.all('/', middlewares.loggedIn);
  router.get('/', function(req, res, next){
    next();
  });
};
