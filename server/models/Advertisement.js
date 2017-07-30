var mongoose = require('mongoose');

var options = {timestamp: true};

var AdvertisementSchema = new mongoose.Schema({
	companyId:{
		type: String,
		required:true,
	},
	jobTitle: { //This will be title of the ad.
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	shortDescription:{
		type: String,
		required: true
	},
	longDescription:{
		type:String,
		required:true
	},
	keywords: {
		type: Array,
		required: true
	},
	responsibilities:{
		type: Array,
		required: true
	},
	requirements: {
		type:Array,
		required: true
	}
});

module.exports = mongoose.model('Advertisement', AdvertisementSchema);