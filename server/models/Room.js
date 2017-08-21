var mongoose = require('mongoose');

var RoomSchema = mongoose.Schema({
  name: {type: String, required: true},
  connections: { type: [{ userId: String, socketId: String }]}
});

module.exports = mongoose.model('Room', RoomSchema);
