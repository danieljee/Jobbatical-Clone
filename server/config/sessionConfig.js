var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

module.exports = function(db){
	this.use(session({
		secret: "terces",
		store: new MongoStore({
			mongooseConnection: db,
			ttl: (600)
		}),
		resave:false,
		saveUninitialized: true,
		unset:"destroy",
		name: "ChocChipCookie",
		cookie: {
			maxAge: 600000
		}
	}));
}