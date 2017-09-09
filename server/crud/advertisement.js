var Advertisement = require('../models/Advertisement');

console.log('Advertisement does this get called');

module.exports = {

	find: function(params){

		return Advertisement.find(params);
	},

	findOne: function(param){

		return Advertisement.findOne(param);
	},

	findById: function(id){

		return Advertisement.findById(id);
	},

	create: function(params){

		return Advertisement.create(params);

	},

	deleteById: function(id){

		return Advertisement.findByIdAndRemove(id);

	},

	delete: function(params){

		return Advertisement.remove(params);

	},

	update: function(id, params){

		return Advertisement.findByIdAndUpdate(id, params);

	}

}