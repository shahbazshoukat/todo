const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  name:{ type: String, required: true},
  email:{ type: String, require: true},
  password:{ type: String, require: true}
});

module.exports = mongoose.model('User', postSchema);
