const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const emojis = require('./emojie');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Leaderboard storage
let leaderboard = [];

// Function to get random emoji + options
function getRandomEmoji() {
    const correctIndex = Math.floor(Math.random() * emojis.length);
    const correctEmoji = emojis[correctIndex];

    let options = [correctEmoji.name];

    while (options.length < 4) {
        const option = emojis[Math.floor(Math.random() * emojis.length)].name;
        if (!options.includes(option)) options.push(option);
    }

    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    return { emoji: correctEmoji.emoji, correctName: correctEmoji.name, options };
}

// Endpoint: get a random emoji
app.get('/api/emoji', (req, res) => {
    res.json(getRandomEmoji());
});

// Endpoint: submit guess
app.post('/api/guess', (req, res) => {
    const { guess, correctName, player } = req.body;
    const isCorrect = guess === correctName;

    // Update leaderboard
    let existing = leaderboard.find(l => l.player === player);
    if (existing) {
        existing.score += isCorrect ? 1 : 0;
    } else {
        leaderboard.push({ player, score: isCorrect ? 1 : 0 });
    }

    res.json({ isCorrect });
});

// Endpoint: get leaderboard
app.get('/api/leaderboard', (req, res) => {
    const topScores = leaderboard
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
    res.json(topScores);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
