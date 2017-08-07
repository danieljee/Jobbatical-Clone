var express = require('express')
	, path = require('path')
	,	favicon = require('serve-favicon')
	,	logger = require('morgan')
	,	cookieParser = require('cookie-parser')
	,	bodyParser = require('body-parser')
	,	mongoose = require('mongoose')
	,	expressValidator = require('express-validator')
	,	sassMiddleware = require('node-sass-middleware')
	,	session = require('express-session')
	,	passport = require('passport')
	,	db = require('./server/config/dbConfig')()
	,	passportConfig = require('./server/config/passportConfig')(passport)
	,	sessionConfig = require('./server/config/sessionConfig')
	,	index = require('./server/routes/index')
	,	app = express();
//SESSION configuration. Changes name of the cookie to make it harder for hackers to find our server type
sessionConfig.call(app, db);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//Disable x-powered-by for a little security (Obfuscate server type to clients). Replace with helmet later
app.disable('x-powered-by');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sassMiddleware({
	src:path.join(__dirname, 'client/sass'),
	dest:path.join(__dirname, 'public/stylesheets')
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator());
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
