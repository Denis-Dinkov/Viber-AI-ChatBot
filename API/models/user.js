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
      active_subscription: Boolean,
      checkout_session_id: String,
      subscription_id: String,
    },
  },
});

module.exports = mongoose.model("User", UserSchema);
