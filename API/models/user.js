const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  uid: String,
  name: String,
  avatar: String,
  // subscription: { type: Date, default: null },

  // isActive: Boolean,
  is_admin: { type: Boolean, default: false },
  stripe_details: {
    type: Object,
    default: {
      sessionId: String,
      paid_sub: Boolean,
    },
  },
});

module.exports = mongoose.model("User", UserSchema);
