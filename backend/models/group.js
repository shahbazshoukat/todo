const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title:{ type: String, required: true},
  userId:{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  members:[
    {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
  ]
});

module.exports = mongoose.model('Group', postSchema);
