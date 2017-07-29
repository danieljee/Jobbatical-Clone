var mongoose = require('mongoose');

var options = {timestamps: true};

var ApplicationSchema = new mongoose.Schema({
	applicantId: { //The database document id of the applicant. Not their emails
		type:String,
		required:true,
	},
	companyId:{
		type:String,
		required:true,
		unique: true
	},
	coverLetter:{
		type:String,
		required:true
	},	
	videoLink:{ 
		type:String
	}
	
	/*
		Optional Questions that companies would like to ask
	*/
},
options);

module.exports = mongoose.model('Application',ApplicationSchema);