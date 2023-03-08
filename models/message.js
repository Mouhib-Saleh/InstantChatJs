const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
  image:{type: String, required:true},
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('message', messageSchema);