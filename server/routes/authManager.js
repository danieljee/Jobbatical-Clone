var controller = require('../controllers')['User'];
var Promise = require('bluebird');
var passport = require('passport');
module.exports = {
	signUp: function(req, res, next){
		req.checkBody('firstName', 'First name is required (letters only)').isAlpha();
		req.checkBody('lastName', 'Last name is required (letters only)').isAlpha();
		req.checkBody('email', 'Invalid Email').isEmail();
		req.checkBody('password', 'Invalid Password (8-16 in length/At least one number)').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/);
		
		Promise.coroutine(function*(){
			let errors = yield req.getValidationResult(); 
			//Once promise is resolved, continue.
			
			if (!errors.isEmpty()){			
				res.json({
					confirmation:"fail",
					message: errors.array()
				});
				return
			}
			
			passport.authenticate('local-signup', function(err, success, message){
				if (err){
					res.json({
						confirmation:"fail",
						message: "Sign up error!"
					});
					return
				}
				if (!success){
					res.json({
						confirmation: "fail",
						message: message
					})
					return
				}
				res.json({
					confirmation: "success",
					result: "Sign up successful!"
				})
			})(req, res);
		})()
	},
	
	login: function(req, res, next){
		req.checkBody('email', 'Invalid Email').isEmail();
		req.checkBody('password', 'Password is required').notEmpty();
		
		Promise.coroutine(function*(){
			var errors = yield req.getValidationResult();
			
			if (!errors.isEmpty()){
				res.json({
					confirmation:"fail",
					message: errors.array()
				});
				return
			}
			
			passport.authenticate('local-login', function(err, user, message){
				if (err){
					res.json({
						confirmation:"fail",
						message: err
					});
					return
				}
				if (!user){
					res.json({
						confirmation:"fail",
						message: message
					});
					return
				}
				req.login(user, function(err){ //When you are implementing custom callback to passport.authenticate, you must explicitly call req.login.
					if (err){
						res.json({
							confirmation:"fail",
							message: "Login detail could not be verified. Try again."
						});
						return
					}	
					res.json({
						confirmation:"success",
						result: "Login successful!"
					});
				});		
			})(req,res,next);
		})();
	}
}









