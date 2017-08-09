var Application = require('../models/Application');

module.exports = {
	find: function(params, callback){
		Application.find(params, function(err, result){
			if (err){
				callback(err, null);
				return
			}
			callback(null, result);
		});
	},
	
	findOne: function(param, callback){
		Application.findOne(param, function(err, user){
			if (err){
				callback(err, null)
				return
			}
			callback(null, user);
		});
	},
	
	findById: function(id, callback){
		Application.findById(id, function(err, result){
			if (err){
				callback(err, null);
				return
			}
			callback(null, result);
		});
	},
	
	create: function(params, callback){
		Application.create(params, function(err, result){
			if (err){
				callback(err, null);
				return
			}
			callback(null, result);
		});
	},
	
	deleteById: function(id, callback){
		Application.findByIdAndRemove(id, function(err, result){
			if (err){
				callback(err, null);
				return
			}
			callback(null, result);
		});
	},
	
	delete: function(params, callback){
		Application.remove(params, function(err, result){
			if (err){
				callback(err, null);
				return
			}
			callback(null, result);
		});
	},
	
	update: function(id, params, callback){
		Application.findByIdAndUpdate(id, params, function(err, result){
			if (err){
				callback(err, null);
				return
			}
			callback(null, result);
		});
	}
}