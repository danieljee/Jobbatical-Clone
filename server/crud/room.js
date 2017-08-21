var Room = require('../models/Room');

module.exports = {
	find: function(params){
		return Room.find(params).exec();
	},

	findOne: function(param){
		return Room.findOne(param).exec();
	},
	findById: function(id){
		return Room.findById(id).exec();
	},

	create: function(params){
		return Room.create(params);
	},

	deleteById: function(id){
		return Room.findByIdAndRemove(id).exec();
	},

	delete: function(params){
		return Room.remove(params).exec();
	},

	update: function(id, params){
		return Room.findByIdAndUpdate(id, params).exec();
	}
};
