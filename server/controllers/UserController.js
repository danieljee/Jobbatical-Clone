var User = require('../models/User');

module.exports = {
	find: function(params){
		return User.find(params).exec();
	},

	findOne: function(param){
		return User.findOne(param).exec();
	},
	findById: function(id){
		return User.findById(id).exec();
	},

	create: function(params){
		return User.create(params).exec();
	},

	deleteById: function(id){
		return User.findByIdAndRemove(id).exec();
	},

	delete: function(params){
		return User.remove(params).exec();
	},

	update: function(id, params){
		return User.findByIdAndUpdate(id, params).exec();
	}
};
