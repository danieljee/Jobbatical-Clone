var mongoose = require('mongoose');
var dburl = 'mongodb://127.0.0.1/jobbaticalClone';

module.exports = function(){
	mongoose.Promise = global.Promise;
	mongoose.connect(dburl, function(err){
		if (err){
			throw new Error('DB connection failed: ' + err);
		}
		console.log('DB connection successful url: ' + dburl);
	}); 
	return mongoose.connection;
};
