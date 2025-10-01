const express = require('express');
const router = express.Router();

// Hard-coded trivia questions
const triviaQuestions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", answer: "Mars" },
  { question: "What is the largest mammal in the world?", answer: "Blue whale" },
  { question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" },
  { question: "Which element has the chemical symbol 'O'?", answer: "Oxygen" }
];

// Store quiz state (for simplicity, this is per server session)
let currentQuestionIndex = 0;
let score = 0;

// GET /quiz - Start quiz and display first question
router.get('/', (req, res) => {
  currentQuestionIndex = 0;
  score = 0;
  res.json({
    message: "Quiz started!",
    question: triviaQuestions[currentQuestionIndex].question
  });
});

// POST /quiz - Submit answer and move to next question
router.post('/', (req, res) => {
  const userAnswer = req.body.answer;
  const currentQuestion = triviaQuestions[currentQuestionIndex];

  if (!userAnswer) {
    return res.status(400).json({ error: "Please provide an answer." });
  }

  let feedback = "";
  if (userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
    score++;
    feedback = "Correct!";
  } else {
    feedback = `Incorrect! The correct answer was: ${currentQuestion.answer}`;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex >= triviaQuestions.length) {
    return res.json({
      message: "Quiz finished!",
      finalScore: score,
      totalQuestions: triviaQuestions.length
    });
  }

  res.json({
    feedback,
    nextQuestion: triviaQuestions[currentQuestionIndex].question
  });
});

// GET /quiz/score - Display final score
router.get('/score', (req, res) => {
  res.json({
    score,
    totalQuestions: triviaQuestions.length
  });
});

module.exports = router;
