import { UserModel } from '../models/userModel.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const result = await UserModel.updateUserById(req.params.id, req.body);
    res.json({ message: 'User updated', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
