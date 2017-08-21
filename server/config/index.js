const env = process.env.NODE_ENV || 'development';

//When hosting on the server, set NODE_ENV as production so that appropriate port, host and urls are set.

module.exports = require('./config.'+ env);
