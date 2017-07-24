var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
},
{
	timestamps: true
});

/*
	Before saving users into the database, always hash the password.
*/
UserSchema.pre('save', function(next){
	const user = this, SALT_FACTOR = 5;
	
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

module.exports = mongoose.module('UserSchema', UserSchema);







