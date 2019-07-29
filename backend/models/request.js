const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  senderId:{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  receiverId:{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  groupId:{type:mongoose.Schema.Types.ObjectId, ref: "Group", required: false}
});

module.exports = mongoose.model('Request', postSchema);
