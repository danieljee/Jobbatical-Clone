var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var config = require('./oAuthConfig');
var Promise = require('bluebird');
//change this
var controller = require('../crud')['user'];

/*
	Here, we define all of our passport strategies.
	"done" is the callback function when we use one of these strategies.
*/

/*
	Protocol flow of OAuth2
	ref: https://tools.ietf.org/html/rfc6749#section-1.2
	1. When user is routed to /auth/facebook, he/she is directed to facebook authorization service for them to provide Authorization grant. Once user do/do not allows, they are redirected to /auth/facebook/callback. The redirect url will have an authorization code as a parameter
	2. We now have the authorization grant. We authenticate with facebook and use this authorization grant to request for an Access token. Access token is a string representing the authorization. It represents specific scopes and duration of access.
	3. We are issued an access token. We then setup user account if not exists, and setup sessions.

	4. We can use the access token from now on to request resources from facebook.
*/
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
							facebookID: profile.id
						};

						user = yield controller.create(newUser);
					} else {
						done(null, false, 'User already exists!');
					}
					var userWithToken = Object.assign({}, user.toObject(), {token: accessToken});
					done(null, userWithToken);
				}
			});

			findOrCreateUser();
		}
	));

	passport.use(new GoogleStrategy(
		{
			clientID: config.google.clientID,
			clientSecret: config.google.clientSecret,
			callbackURL: config.google.callbackURL,
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
							googleID: profile.id
						};

						user = yield controller.create(newUser);
					} else {
						done(null, false, 'User already exists!');
					}
					var userWithToken = Object.assign({}, user.toObject(), {token: accessToken});
					done(null, userWithToken);
				}
			});

			findOrCreateUser();
		}
	));

	passport.use('local-signup', new LocalStrategy(
		{
			passReqToCallback: true,  //This option enables us to pass req to the callback.
			usernameField: 'email'
		},
		function(req, email, password, done){
			controller.findOne({email:email})
				.then(function(user){
					if(user){
						return done(null, false, 'User already exists!');
					}
					return controller.create({firstName: req.body.firstName, lastName:req.body.lastName, email:email, password:password});
				})
				.then(function(result){
					return done(null, result);
				})
				.catch(function(err){
					return done(err);
				});
		}
	));

	passport.use('local-login', new LocalStrategy(
		{
			usernameField: 'email'
		},
		function(email, password, done){
			controller.findOne({email:email})
				.then(function(user){
					if (!user){
						return done(null, false, 'Non-existing user');
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
					});
				})
				.catch(function(err){
					return done(err);
				});
		}
	));

	//Here we determine what be stored in the session store (mongodb)
	//We will store user document ID and token?
	//req.session.passport.user will be the object {id, token}
	passport.serializeUser(function(user, done) {
		done(null, {id: user.id, token:user.token});
	});

	//Here, we will get the user data from user model and assign it to req.user
	passport.deserializeUser(function(userIdAndToken, done) {
		controller.findById(userIdAndToken.id)
			.then(function(user){
				done(null, user);
			})
			.catch(function(err){
				done(err);
			});
	});
};
