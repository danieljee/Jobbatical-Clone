var express = require('express')
	,	serverSideRendering = require('../serverSideRendering')
	,	routes = require('require-dir')() //Get an object of all the dirname within cwd.
	,	mainRouter = express.Router();

	Object.keys(routes).forEach(function(routeName){
		console.log('route name: ' + routeName);
		var router = express.Router(); //create a router for each route
		require(`./${routeName}`)(router);
		mainRouter.use('/'+routeName, router);
	});

	mainRouter.get('*', function(req, res) {
		console.log('new GET request!');
		const context = {};
		const markUp = serverSideRendering(context, req.url);
		res.render('index', {content: markUp});
	});

	export default mainRouter;
