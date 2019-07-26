const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title:{ type: String, required: false},
  userId:{type: mongoose.Schema.Types.ObjectId, ref: "User", required: false},
});

module.exports = mongoose.model('List', postSchema);
