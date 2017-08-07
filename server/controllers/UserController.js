var User = require('../models/User');

module.exports = {
	find: function(params){
		return new Promise(function(resolve, reject){
			User.find(params, function(err, result){
				err ? reject(err): resolve(result);
			});
		});
	},

	findOne: function(param){
		return new Promise(function(resolve, reject){
			User.findOne(param, function(err, user){
				err ? reject(err):resolve(user);
			});
		});
	},

	findById: function(id){
		return new Promise(function(resolve, reject){
			User.findById(id, function(err, result){
				(err)? reject(err): resolve(result);
			});
		});
	},

	create: function(params){
		return new Promise(function(resolve, reject){
			User.create(params, function(err, result){
				(err)? reject(err): resolve(result);
			});
		});
	},

	deleteById: function(id){
		return new Promise(function(resolve, reject){
			User.findByIdAndRemove(id, function(err, result){
				(err)? reject(err): resolve(result);
			});
		});
	},

	delete: function(params){
		return new Promise(function(resolve, reject){
			User.remove(params, function(err, result){
				(err)? reject(err):resolve(result);
			});
		});
	},

	update: function(id, params){
		return new Promise(function(resolve, reject){
			User.findByIdAndUpdate(id, params, function(err, result){
				(err)? reject(err): resolve(result);
			});
		});
	}
};
