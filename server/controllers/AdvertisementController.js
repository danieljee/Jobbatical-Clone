var Advertisement = require('../models/Advertisement');

module.exports = {
	find: function(params, callback){
		Advertisement.find(params, function(err, result){
			if (err){
				callback(err, null);
				return
			}
			callback(null, result);
		});
	},
	
	findOne: function(param, callback){
		Advertisement.findOne(param, function(err, user){
			if (err){
				callback(err, null)
				return
			}
			callback(null, user);
		});
	},
	
	findById: function(id, callback){
		Advertisement.findById(id, function(err, result){
			if (err){
				callback(err, null);
				return
			}
			callback(null, result);
		});
	},
	
	create: function(params, callback){
		Advertisement.create(params, function(err, result){
			if (err){
				callback(err, null);
				return
			}
			callback(null, result);
		});
	},
	
	deleteById: function(id, callback){
		Advertisement.findByIdAndRemove(id, function(err, result){
			if (err){
				callback(err, null);
				return
			}
			callback(null, result);
		});
	},
	
	delete: function(params, callback){
		Advertisement.remove(params, function(err, result){
			if (err){
				callback(err, null);
				return
			}
			callback(null, result);
		});
	},
	
	update: function(id, params, callback){
		Advertisement.findByIdAndUpdate(id, params, function(err, result){
			if (err){
				callback(err, null);
				return
			}
			callback(null, result);
		});
	}
}