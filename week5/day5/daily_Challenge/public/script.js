let currentEmoji = {};
let timer;
const timeLimit = 10; // seconds

// Load a new emoji and options
async function loadEmoji() {
    clearInterval(timer); // clear previous timer

    // Fetch random emoji from server
    const res = await fetch('/api/emoji');
    currentEmoji = await res.json();

    // Display emoji
    document.getElementById('emoji').textContent = currentEmoji.emoji;

    // Display options
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    currentEmoji.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.onclick = () => submitGuess(option);
        optionsDiv.appendChild(btn);
    });

    // Clear feedback
    document.getElementById('feedback').textContent = '';

    // Start timer for this round
    startTimer();
}

// Submit guess
async function submitGuess(guess) {
    clearInterval(timer); // stop timer

    const playerName = document.getElementById('player').value || 'Anonymous';

    const res = await fetch('/api/guess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            guess: guess || '', // null or timed out treated as empty
            correctName: currentEmoji.correctName,
            player: playerName
        })
    });

    const data = await res.json();

    // Show feedback
    if (!guess) {
        document.getElementById('feedback').textContent = `⏰ Time's up! It was ${currentEmoji.correctName}`;
    } else {
        document.getElementById('feedback').textContent = data.isCorrect ? '✅ Correct!' : `❌ Wrong! It was ${currentEmoji.correctName}`;
    }

    // Update leaderboard
    loadLeaderboard();
}

// Load leaderboard
async function loadLeaderboard() {
    const res = await fetch('/api/leaderboard');
    const leaderboard = await res.json();
    const ul = document.getElementById('leaderboard');
    ul.innerHTML = '';
    leaderboard.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.player}: ${entry.score}`;
        ul.appendChild(li);
    });
}

// Timer function
function startTimer() {
    let timeLeft = timeLimit;
    document.getElementById('feedback').textContent = `Time left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('feedback').textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitGuess(null); // timeout
        }
    }, 1000);
}

// Event listener for next emoji button
document.getElementById('nextBtn').addEventListener('click', loadEmoji);

// Initial load
loadEmoji();
loadLeaderboard();
