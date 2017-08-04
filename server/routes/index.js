var express = require('express');
var router = express.Router();
var api = require('./api');
var authManager = require('./authManager');
var middlewares = require('./middlewares');
var passport = require('passport');

router.use('/api', api);

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {scope:'email', failureRedirect: '/login'}), function(req, res){
	res.redirect('/profile')
});


router.route('/join')
	.all(middlewares.notLoggedIn) //allow only unauthenticated users.
	.post(authManager.signUp)
	.get((req, res)=>{
		res.render('index'); //This will have to change depending on the routing function of the react app. 
	})

router.route('/login')
	.all(middlewares.notLoggedIn)
	.post(authManager.login)
	.get((req, res)=>{
		res.render('index');
	})

//Add something like this...
// router.route('/profile')
	// .all(middlewares.loggedIn)
	// .get((req, res)=>{
		// res.render('index');
	// })
router.route('/profile')
	.all(middlewares.loggedIn)
	.get((req, res)=>{
		res.render('index');
	})
router.get('*', function(req, res, next) {
	res.render('index');
});

module.exports = router;
