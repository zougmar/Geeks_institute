// server/server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// GET request
app.get('/api/hello', (req, res) => {
  res.send({ message: 'Hello From Express' });
});

// POST request
app.post('/api/world', (req, res) => {
  console.log(req.body); // Logs input from client
  const userInput = req.body.post;
  res.send({
    reply: `I received your POST request. This is what you sent me: ${userInput}`,
  });
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
