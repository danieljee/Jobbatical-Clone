var middlewares = require('../middlewares')
  ,  passport = require('passport');

module.exports = function authRoute(router){
  router.all('/*', middlewares.notLoggedIn);
  router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
  router.get('/facebook/callback', passport.authenticate('facebook', {scope:'email', successRedirect: '/profile', failureRedirect: '/login'}));
  router.get('/google', passport.authenticate('google', {scope: ['email']}));
  router.get('/google/callback', passport.authenticate('google', {successRedirect: '/profile', failureRedirect: '/login'}));
};
