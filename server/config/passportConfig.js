var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./oAuthConfig');
var Promise = require('bluebird');
var jwt = require('jsonwebtoken');
var controller = require('../controllers')['User'];

/*
	Here, we define all of our passport strategies. 
	"done" is the callback function when we use one of these strategies. 
*/



function addJWT(user){
	const token = jwt.sign({email:user.email}, config.jwtSecret, {
		expiresIn: 60000
	});

	return Object.assign({}, user.toObject(), {token});
}

module.exports = function(passport){
	passport.use(new FacebookStrategy(
		{
			clientID: config.facebook.clientID,
			clientSecret: config.facebook.clientSecret,
			callbackURL: config.facebook.callbackURL,
			profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
		},
		function(accessToken, refreshToken, profile, done){
			var findOrCreateUser = Promise.coroutine(function*(){
				if (profile){
					let user = yield controller.findOne({email:profile.emails[0].value});
					if (!user){
						let newUser = {
							email: profile.emails[0].value,
							firstName: profile.name.givenName,
							lastName: profile.name.familyName,
						};
						
						user = yield controller.create(newUser);
					}
					
					const userWithToken = addJWT(user);
					done(null, userWithToken)
				}
			});
			// process.nextTick(function(){
				
				// return done(null, profile);
			// })
			
			findOrCreateUser();
		}
	));
	
	passport.use('local-signup', new LocalStrategy(
		{
			passReqToCallback: true,  //This option enables us to pass req to the callback. 
			usernameField: "email"
		},
		function(req, email, password, done){
			controller.findOne({email:email})
				.then(function(user){
					if(user){
						console.log("local signup: user exists")
						return done(null, false, "User already exists!");
					}
					return controller.create({firstName: req.body.firstName, lastName:req.body.lastName, email:email, password:password})
				})
				.then(function(result){
					return done(null, result);
				})
				.catch(function(err){
					console.log(err); 
					return done(err)
				});
		}
	));
	
	passport.use('local-login', new LocalStrategy(
		{
			usernameField: "email"
		},
		function(email, password, done){
			controller.findOne({email:email})
				.then(function(user){
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
						return done(null, user);
					})
				})
				.catch(function(err){
					return done(err)
				})
		}
	));
	
	passport.serializeUser(function(user, done) {
		//Here we determine which data of the user object (document) shuold be stored in the session
		//so that it can be used in deserialization to get user data from db or memory.
		//user.id is saved to req.session.passport.user
		done(null, {id: user.id, token: user.token});
	});
	passport.deserializeUser(function(user, done) {
		controller.findById(user.id)
			.then(function(user){
				done(null, user);
			})
			.catch(function(err){
				done(err);
			})
	});
}