const User = require('../models/User');
const bcrypt = require('bcrypt');

const createUser = async (data) => {
  data.password = await bcrypt.hash(data.password, 10);
  const user = new User(data);
  return await user.save();
};

const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (user && await bcrypt.compare(password, user.password)) {
    return user;
  } else {
    return null;
  }
};

module.exports = {
  createUser,
  authenticateUser,
};