var controllers = require('../controllers')
	,	middlewares = require('../middlewares');

module.exports = function apiRoute(router){
	router.post('/:resource', middlewares.loggedIn, function(req, res){
			var resource = req.params.resource;
			var controller = controllers[resource];

			if (!controller){
				res.json({
					confirmation:'fail',
					message: 'Invalid resource type'
				});
				return;
			}
			//req and res should be passed to controller. Controller should handle all the logic?
			controller.create(req.body, function(err, result){
				if (err){
					res.json({
						confirmation:'fail',
						message: err
					});
					return;
				}

				res.json({
					confirmation:'success',
					result: result
				});
			});
		});

	router.get('/:resource', function(req, res){
		var resource = req.params.resource;
		var controller = controllers[resource];

		if (!controller){
			res.json({
				confirmation:'fail',
				message: 'Invalid resource type'
			});
			return;
		}

		controller.find({}, function(err, result){
			if (err){
				res.json({
					confirmation: 'fail',
					message: err
				});
				return;
			}
			res.json({
				confirmation: 'success',
				result: result
			});
		});
	});

	return router;
};
