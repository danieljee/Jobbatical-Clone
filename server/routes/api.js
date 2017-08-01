var controllers = require('../controllers');
var express = require('express');
var router = express.Router();

module.exports = function(){
	router.route('/:resource')
		.post(function(req, res, next){
			var resource = req.params.resource;
			var controller = controllers[resource];
			
			if (!controller){
				res.json({
					confirmation:"fail",
					message: "Invalid resource type"
				});
				return
			}
			
			//Check if user is logged in HERE.
			
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
		
		.get(function(req, res, next){
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