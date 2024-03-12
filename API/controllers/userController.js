const userService = require('../services/userService');

const register = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.json(user);
};

const login = async (req, res) => {
  const { email, password } = req.query;
  if(!email || !password) return res.status(400).json({ message: 'Email and password are required' });
  try {
    const user = await userService.authenticateUser(email, password);
    if (user) {
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Login failed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

module.exports = {
  register,
  login,
};