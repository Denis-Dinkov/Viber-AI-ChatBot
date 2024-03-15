const userService = require('../services/userService');

const getUsers = async (req, res) => {
  const { id } = req.query;
  try {
    if(!id) throw new Error('No user id provided');
    const users = await userService.getUsers(id);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getUsers
};