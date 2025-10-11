const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({ message: 'Missing email or password' });
  const user = await User.findOne({ email });
  if(!user) return res.status(401).json({ message: 'Invalid credentials' });
  const match = await user.comparePassword(password);
  if(!match) return res.status(401).json({ message: 'Invalid credentials' });
  const token = signToken(user);
  res.json({ token });
};

exports.me = async (req, res) => {
  const { email, name, role, _id } = req.user;
  res.json({ id: _id, email, name, role });
};
