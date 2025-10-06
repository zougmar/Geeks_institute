// routes/users.js
import express from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { readJson, writeJson } from '../helpers/jsonStore.js';

const router = express.Router();
const SALT_ROUNDS = 10;

// helper to remove password from user objects for responses
function sanitize(user) {
  const { password, ...rest } = user;
  return rest;
}

// POST /register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body ?? {};
    if (!username || !password) {
      return res.status(400).json({ error: 'username and password are required' });
    }

    const users = await readJson();

    // Check uniqueness (case-insensitive)
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = {
      id: uuidv4(),
      username,
      password: hashed,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    await writeJson(users);

    return res.status(201).json({ message: 'User registered', user: sanitize(newUser) });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Internal server error: ' + err.message });
  }
});

// POST /login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body ?? {};
    if (!username || !password) {
      return res.status(400).json({ error: 'username and password are required' });
    }

    const users = await readJson();
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());

    if (!user) {
      // don't reveal whether username exists
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // For demo: returning user data (without password). In production return a JWT/session.
    return res.json({ message: 'Login successful', user: sanitize(user) });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error: ' + err.message });
  }
});

// GET /users - return list (demo only; passwords removed)
router.get('/', async (req, res) => {
  try {
    const users = await readJson();
    return res.json(users.map(sanitize));
  } catch (err) {
    console.error('Get users error:', err);
    return res.status(500).json({ error: 'Internal server error: ' + err.message });
  }
});

// GET /users/:id
router.get('/:id', async (req, res) => {
  try {
    const users = await readJson();
    const user = users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(sanitize(user));
  } catch (err) {
    console.error('Get user error:', err);
    return res.status(500).json({ error: 'Internal server error: ' + err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { username, password } = req.body ?? {};
    if (!username && !password) {
      return res.status(400).json({ error: 'Provide username or password to update' });
    }

    const users = await readJson();
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'User not found' });

    // If changing username, ensure uniqueness
    if (username && users.some((u, i) => i !== index && u.username.toLowerCase() === username.toLowerCase())) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    if (username) users[index].username = username;
    if (password) users[index].password = await bcrypt.hash(password, SALT_ROUNDS);

    users[index].updatedAt = new Date().toISOString();

    await writeJson(users);
    return res.json({ message: 'User updated', user: sanitize(users[index]) });
  } catch (err) {
    console.error('Update user error:', err);
    return res.status(500).json({ error: 'Internal server error: ' + err.message });
  }
});

export default router;
