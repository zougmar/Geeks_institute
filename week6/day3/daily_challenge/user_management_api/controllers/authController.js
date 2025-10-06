import bcrypt from 'bcrypt';
import { UserModel } from '../models/userModel.js';

export const register = async (req, res) => {
  try {
    const { email, username, first_name, last_name, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.createUserTransaction({ email, username, first_name, last_name }, hashedPassword);

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userHash = await UserModel.findHashByUsername(username);

    if (!userHash) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, userHash.password);
    if (!match) return res.status(401).json({ message: 'Invalid password' });

    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
