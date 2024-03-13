const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  uid: String,
  name: String,
  avatar: String,
  subscription: Boolean,
  isActive: Boolean,
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);