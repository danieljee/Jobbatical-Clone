var middlewares = require('../middlewares')
  ,  passport = require('passport');

module.exports = function authRoute(router){
  router.all('/', middlewares.notLoggedIn);
  router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
  router.get('/facebook/callback', passport.authenticate('facebook', {scope:'email', failureRedirect: '/login'}), function(req, res){
    res.redirect('/profile');
  });
  router.get('/auth/google', passport.authenticate('google', {scope: ['email']}));
  router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res){
    res.redirect('/');
  });
};
