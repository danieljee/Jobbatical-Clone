var mongoose = required('mongoose');

var options = {timestamps:true};

var MessageSchema = new mongoose.Schema({
	senderId: {
		type: String,
		required:true,
	},
	recipientId:{
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	}
},
options)

module.exports = mongoose.model('Message', MessageSchema);