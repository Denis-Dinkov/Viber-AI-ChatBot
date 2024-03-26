const User = require("../models/user");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const addUser = async (uid, name, avatar) => {
  if (!uid || !name) return null;
  const user = await User.find({ uid });
  if (user.length > 0) {
    if (user.subscription != null && user.subscription < new Date()) {
      user.subscription = null;
      await user.save();
    }
    return null;
  }

  const newUser = new User({
    uid,
    name,
    avatar,
    stripe_details: {
      active_subscription: false,
      checkout_session_id: "",
      subscription_id: "",
      start_date: null,
      end_date: null,
    },
  });
  return await newUser.save();
};

const getUser = async (uid) => {
  if (!uid) return null;
  // uid = uid.replace(/\s/g, "+");
  const user = await User.findOne({ uid });
  if (!user) return null;
  return user;
};

const changeUserStatus = async (uid, flag) => {
  if (!uid) return null;
  const user = await User.findOne({ uid });
  if (!user) return null;
  user.isActive = flag;
  return await user.save();
};

const changeUserSession = async (uid, checkoutId) => {
  try {
    const user = await getUser(uid);
    if (!user) return null;
    user.stripe_details = {
      ...user.stripe_details,
      checkout_session_id: checkoutId,
    };
    return await user.save();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const changeUserSubscription = async (subId, uid, flag) => {
  try {
    if (!uid) return null;
    const user = await getUser(uid);
    if (!user) return null;
    user.stripe_details = {
      ...user.stripe_details,
      active_subscription: flag,
      subscription_id: subId,
    };

    return await user.save();
  } catch (error) {
    console.error(error); // Log the error for debugging
    return null;
  }
};

module.exports = {
  getAllUsers,
  addUser,
  changeUserStatus,
  changeUserSession,
  getUser,
  changeUserSubscription,
};
