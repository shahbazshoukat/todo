const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title:{ type: String, required: true},
  notes:{ type: String, require: false},
  list:{ type: mongoose.Schema.Types.ObjectId, ref: "List", require: false},
  labels:[
    { type: mongoose.Schema.Types.ObjectId, ref: "Label", required: false}
  ],
  reminder:{ type: String, require: false},
  userId:{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  completeStatus:{type: Boolean, require: false},
  groupId:{type:mongoose.Schema.Types.ObjectId, ref: "Group", required: false}
});

module.exports = mongoose.model('Task', postSchema);
