var controllers = require('../controllers');
var passport = require('passport');
var express = require('express');
var middlewares = require('./middlewares')
var router = express.Router();

module.exports = function(){
	router.get('/currentUser', function(req, res, next){
		res.json({
			confirmation:'success',
			result: req.user
		})
	});
	router.post('/:resource', middlewares.loggedIn, function(req, res, next){
			var resource = req.params.resource;
			var controller = controllers[resource];
			
			if (!controller){
				res.json({
					confirmation:"fail",
					message: "Invalid resource type"
				});
				return
			}

			controller.create(req.body, function(err, result){
				if (err){
					res.json({
						confirmation:"fail",
						message: err
					});
					return
				}
				
				res.json({
					confirmation:"success",
					result: result
				});
			});
		})
		
	router.get('/:resource', function(req, res, next){
		var resource = req.params.resource;
		var controller = controllers[resource];
		
		if (!controller){
			res.json({
				confirmation:"fail",
				message: "Invalid resource type"
			});
			return
		}
		
		controller.find({}, function(err, result){
			if (err){
				res.json({
					confirmation: "fail",
					message: err
				});
				return
			}
			res.json({
				confirmation: "success",
				result: result
			})
		});
	})
	
	return router;
}