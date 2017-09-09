var Application = require('../models/Application');

module.exports = {

	find: function(params){

		return Application.find(params);

	},

	findOne: function(param){

		return Application.findOne(param);

	},

	findById: function(id){

		return Application.findById(id);

	},

	create: function(params){

		return Application.create(params);

	},

	deleteById: function(id){

		return Application.findByIdAndRemove(id);

	},

	delete: function(params){

		return Application.remove(params);

	},

	update: function(id, params){

		return Application.findByIdAndUpdate(id, params);

	}

}