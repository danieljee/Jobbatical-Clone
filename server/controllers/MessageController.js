var Message = require('../models/Message');

module.exports = {
	find: function(params, callback){
		Message.find(params, function(err, result){
			if (err){
				callback(err, null);
				return
			}
			callback(null, result);
		});
	},
	
	findOne: function(param, callback){
		Message.findOne(param, function(err, user){
			if (err){
				callback(err, null)
				return
			}
			callback(null, user);
		});
	},
	
	findById: function(id, callback){
		Message.findById(id, function(err, result){
			if (err){
				callback(err, null);
				return
			}
			callback(null, result);
		});
	},
	
	create: function(params, callback){
		Message.create(params, function(err, result){
			if (err){
				callback(err, null);
				return
			}
			callback(null, result);
		});
	},
	
	deleteById: function(id, callback){
		Message.findByIdAndRemove(id, function(err, result){
			if (err){
				callback(err, null);
				return
			}
			callback(null, result);
		});
	},
	
	delete: function(params, callback){
		Message.remove(params, function(err, result){
			if (err){
				callback(err, null);
				return
			}
			callback(null, result);
		});
	},
	
	update: function(id, params, callback){
		Message.findByIdAndUpdate(id, params, function(err, result){
			if (err){
				callback(err, null);
				return
			}
			callback(null, result);
		});
	}
}