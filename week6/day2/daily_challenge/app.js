const express = require('express');
const bodyParser = require('body-parser');
const quizRouter = require('./routes/quiz');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/quiz', quizRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Trivia Quiz server running on http://localhost:${PORT}`);
});
