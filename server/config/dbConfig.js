var mongoose = require('mongoose');
var dburl = "mongodb://localhost/jobbaticalClone";

module.exports = function(){
	mongoose.connect(dburl, function(err){
		if (err){
			throw new Error("DB connection failed: " + err);
		}
		console.log("DB connection successful url: " + dburl);
	})
	return mongoose.connection
}