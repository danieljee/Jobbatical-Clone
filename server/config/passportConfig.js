var passportLocal = require('passport-local');
const LocalStrategy = passportLocal.Strategy;
var controller = require('../controllers')['User'];

/*
	Here, we define all of our passport strategies. 
	"done" is the callback function when we use one of these strategies. 
*/

module.exports = function(passport){
	passport.use('local-signup', new LocalStrategy(
		{
			passReqToCallback: true,  //This option enables us to pass req to the callback. 
			usernameField: "email"
		},
		function(req, email, password, done){
			controller.findOne({email:email}, function(err, user){
				if (err){
					console.log("local signup: error")
					return done(err);
				}
				if (user){ //if user is found,
					console.log("local signup: user exists")
					return done(null, false, "User already exists!");
				}
				controller.create({firstName: req.body.firstName, lastName:req.body.lastName, email:email, password:password}, function(err, result){
					if (err){
						console.log("local signup: create error")
						return done(err);
					}
					return done(null, true);
					//Success!
				});
			});
		}
	));
	
	passport.use('local-login', new LocalStrategy(
		{
			usernameField: "email"
		},
		function(email, password, done){
			controller.findOne({email:email}, function(err, user){
				if (err){
					console.log('local login: error')
					return done(err);
				}
				if (!user){
					return done(null, false, "Non-existing user!");
				}
				
				user.comparePassword(password, function(err, isMatch){
					if (err){
						console.log('local login comparePassword: error');
						return done(err);
					}
					if (!isMatch){
						return done(null, false, 'Invalid email or password!');
					}
					return done(null, true);
				})
			});
		}
	));
	
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	passport.deserializeUser(function(id, done) {
		controller.findById(id, function(err, user) {
		  done(err, user);
		});
	});
}