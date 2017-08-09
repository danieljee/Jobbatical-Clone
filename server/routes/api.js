var apiController = require('../controllers/apiController')
	,	middlewares = require('../middlewares');

module.exports = function apiRoute(router){
	router.post('/:resource', middlewares.loggedIn, apiController.postResource);
	router.get('/:resource', apiController.getResources);
	router.get('/:resource/:id', apiController.getResource);
	return router;
};
