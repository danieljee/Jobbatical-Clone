var User = require('../models/User');

module.exports = {
	find: function(params, callback){
		User.find(params, function(err, result){
			if (err){
				callback(err, null);
				return
			}
			callback(null, result);
		})
	},
	
	findOne: function(param, callback){
		User.findOne(param, function(err, user){
			if (err){
				callback(err, null)
				return
			}
			callback(null, user);
		});
	},
	
	findById: function(id, callback){
		User.findById(id, function(err, result){
			if (err){
				callback(err, null);
				return
			}
			callback(null, result);
		});
	},
	
	create: function(params, callback){
		User.create(params, function(err, result){
			if (err){
				callback(err, null);
				return
			}
			callback(null, result);
		});
	},
	
	deleteById: function(id, callback){
		User.findByIdAndRemove(id, function(err, result){
			if (err){
				callback(err, null);
				return
			}
			callback(null, result);
		});
	},
	
	delete: function(params, callback){
		User.remove(params, function(err, result){
			if (err){
				callback(err, null);
				return
			}
			callback(null, result);
		});
	},
	
	update: function(id, params, callback){
		User.findByIdAndUpdate(id, params, function(err, result){
			if (err){
				callback(err, null);
				return
			}
			callback(null, result);
		});
	}
}






