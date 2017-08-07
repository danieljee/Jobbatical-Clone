var express = require('express')
	, router = express.Router()
	, api = require('./api')
	, authMiddleware = require('../middlewares/authMiddleware')
	, middlewares = require('../middlewares')
	, passport = require('passport')
	,	serverSideRendering = require('../serverSideRendering');

router.use('/api', api);

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {scope:'email', failureRedirect: '/login'}), function(req, res){
	res.redirect('/profile');
});
router.get('/auth/google', passport.authenticate('google', {scope: ['email']}));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res){
	res.redirect('/');
});

router.route(['/join', '/login'])
	.all(middlewares.notLoggedIn);
router.route(['/profile'])
	.all(middlewares.loggedIn);

router.post('/join', authMiddleware.signUp, function(req, res){
	res.json({
		confirmation: 'success',
		result: 'Sign up successful!'
	});
});

router.post('/login', authMiddleware.login, function(req, res){
	res.json({
		confirmation:'success',
		result: 'Login successful!'
	});
});

router.get('*', function(req, res) {
	const context = {};
	const markUp = serverSideRendering(context, req.url);
	res.render('index', {content: markUp});
});

module.exports = router;
