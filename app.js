var express = require('express')
	,	app = express()
	, http = require('http')
	, config = require('./server/config')
	, path = require('path')
	,	passport = require('passport')
	,	dbConfig = require('./server/config/dbConfig')
	, passportConfig = require('./server/config/passportConfig')
	,	sessionConfig = require('./server/config/sessionConfig')
	, socketConfig = require('./server/config/socketConfig')
	,	logger = require('morgan')
	,	cookieParser = require('cookie-parser')
	, fs = require('fs')
	, socket = require('socket.io')
	,	bodyParser = require('body-parser')
	,	expressValidator = require('express-validator')
	,	router = require('./server/routes')
	, sessionMiddleware;
function setup(){
  passportConfig(passport);
	sessionMiddleware = sessionConfig(dbConfig());
  app.use(sessionMiddleware);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.disable('x-powered-by'); //Replace with helmet later
  var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
  app.use(logger('dev', {stream: accessLogStream}));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(expressValidator());
  app.use('/', router);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
}
setup();

app.set('port', config.port);
var server = http.createServer(app);
server.listen(config.port, function listening(){
	console.log('Listening on %d...', server.address().port);
});
server.on('error', onError);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error('Port ' + config.port + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('Port ' + config.port + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

app.io = socket(server);
app.io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

socketConfig(app);
