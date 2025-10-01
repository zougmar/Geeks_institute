// app.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 5001;

// Middleware to parse JSON requests
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});



// Temporary user storage
let users = [];

// Secret for JWT
const JWT_SECRET = "your_secret_key"; // Replace with env variable in production

// Register
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Missing data" });

  // Check if user exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user
  const user = { id: users.length + 1, username, password: hashedPassword };
  users.push(user);

  res.status(201).json({ message: "User registered successfully" });
});

// Login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Missing data" });

  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

  // Generate JWT
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ message: "Login successful", token });
});

// Middleware to protect routes
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Profile (protected)
app.get("/api/profile", authenticate, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  res.json({ id: user.id, username: user.username });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
