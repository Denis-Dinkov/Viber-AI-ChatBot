const User = require('../models/user');

const getUsers = async (id) => {
  if(!id) return [];
  const user = await User.find({ uid: id });
  if(user.length === 0) return [];
  if(user.isAdmin === false) return [];
  return await User.find();
}

module.exports = {
  getUsers
}