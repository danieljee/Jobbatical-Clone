var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var options = {timestamps: true, discriminatorKey: 'type'};

var UserSchema = new mongoose.Schema({
	firstName:{
		type:String,
		required: true
	},
	lastName:{
		type:String,
		required:true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
	},
	location: {
		type: String,
	},
	facebookID: {
		type: String,
		default: null
	},
	googleID: {
		type:String,
		default: null
	},
	role:{
		type: String,
		enum: ['Member', 'Admin'],
		default: 'Member'
	}
},
options);

/*
	User schemas configuration
*/

//
UserSchema.set('toObject', { getters: true});

UserSchema.pre('save', function(next){
	const user = this, SALT_FACTOR = 5;
	
	if (!user.password){next();} //Password is not required when signing up with facebook or google.
	if (!user.isModified('password')) return next();
	
	bcrypt.genSalt(SALT_FACTOR, function(err, salt){
		if (err) return next(err);
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
})

UserSchema.methods.comparePassword = function(candidatePassword, callback){
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		if (err) return callback(err, false);
		callback(null, isMatch);
	})
}

var User = mongoose.model('User', UserSchema);

/*
	Company specific details
*/
var CompanySchema = User.discriminator('Company', new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	size: {
		type: String,
		required: true
	},
}));

/*
	Applicants specific details
*/
var ApplicantSchema = User.discriminator('Applicant', new mongoose.Schema({
	firstName: {
		type:String,
		required: true
	},
	lastName: {
		type:String,
		required:true
	},
	skills: {
		type: Array,
	},
	about: {
		type: String
	},
	savedJobs:{
		type: Array,
	}
}));

module.exports = User







