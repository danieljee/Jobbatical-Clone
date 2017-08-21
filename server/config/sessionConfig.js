var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var config = require('./index');
module.exports = function(db){
	return session({
		secret: config.sessionSecret,
		store: new MongoStore({
			mongooseConnection: db,
			ttl: (6000)
		}),
		resave:false,
		saveUninitialized: true,
		unset:'destroy',
		name: 'ChocChipCookie',
		cookie: {
			/*secure: true,*/ //This option will need to be enabled when https is setup
			/*domain: 'jobbatical.com'*/
			httpOnly: true, //This option will ensure cookie is sent over HTTP(s) only. Helps against Cross-site scripting attacks.
			maxAge: 6000000
		}
	});
};
