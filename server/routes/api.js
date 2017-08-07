var controllers = require('../controllers')
	,	express = require('express')
	,	middlewares = require('../middlewares')
	,	router = express.Router();

module.exports = function(){
	router.get('/currentUser', function(req, res){
		res.json({
			confirmation:'success',
			result: req.user
		});
	});
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
