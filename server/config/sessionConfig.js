var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

module.exports = function(db){
	this.use(session({
		secret: 'terces',
		store: new MongoStore({
			mongooseConnection: db,
			ttl: (600)
		}),
		resave:false,
		saveUninitialized: true,
		unset:'destroy',
		name: 'ChocChipCookie',
		cookie: {
			/*secure: true,*/ //This option will need to be enabled when https is setup
			/*domain: 'jobbatical.com'*/
			httpOnly: true, //This option will ensure cookie is sent over HTTP(s) only. Helps against Cross-site scripting attacks.
			maxAge: 600000
		}
	}));
};
