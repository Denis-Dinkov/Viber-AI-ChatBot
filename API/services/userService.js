const User = require("../models/user");

const getUsers = async (id) => {
  if (!id) return [];
  const user = await User.find({ uid: id });
  if (user.length === 0) return [];
  if (user.isAdmin === false) return [];
  return await User.find();
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
    subscription: null,
    isActive: true,
  });
  return await newUser.save();
};

const setSubscribeStatus = async (uid, flag) => {
  if (!uid) return null;
  const user = await User.findOne({ uid });
  if (!user) return null;
  if (flag == true) {
    let date = new Date();
    date.setMinutes(date.getMinutes() + 1);
    user.subscription = date;
  } else {
    user.subscription = null;
  }
  return await user.save();
};

const checkSubscription = async (uid) => {
  if (!uid) return null;
  const user = await User.findOne({ uid });
  if (!user) return null;
  if (user.subscription == null) return false;
  return user.subscription > new Date() ? true : false;
};

const changeUserStatus = async (uid, flag) => {
  if (!uid) return null;
  const user = await User.findOne({ uid });
  if (!user) return null;
  user.isActive = flag;
  return await user.save();
};

const getUser = async (uid) => {
  if (!uid) return null;
  uid = uid.replace(/\s/g, '+');
  return await User.findOne({ uid }).select(
    "name avatar subscription stripe_details"
  );
};

const changeUserSession = async (uid, sessionId) => {
  try {
    const user = await getUser(uid);
    if (!user) return null;
    user.stripe_details = { sessionId, paid_sub: false };
    return await user.save();
  } catch (error) {
    console.error(error);
    return null;
  }
};
const changeUserSubscription = async (uid, flag) => {
  try {
    if (!uid) return null;
    const user = await getUser(uid);
    if (!user) return null;
    user.stripe_details = {
      sessionId: user.stripe_details.sessionId,
      paid_sub: flag,
    }
    return await user.save();
  } catch (error) {
    console.error(error); // Log the error for debugging
    return null;
  }
};

module.exports = {
  getUsers,
  addUser,
  setSubscribeStatus,
  checkSubscription,
  changeUserStatus,
  changeUserSession,
  getUser,
  changeUserSubscription,
};
