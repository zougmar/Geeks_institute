const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris"
    },
    {
      question: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      answer: "JavaScript"
    },
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Trainer Marking Language",
        "Hyper Text Markup Language",
        "Hyper Text Machine Language",
        "Hyper Tool Markup Language"
      ],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Jupiter", "Mars", "Saturn"],
      answer: "Jupiter"
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Pb", "Fe"],
      answer: "Au"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars"
    },
    {
      question: "What is the main ingredient in guacamole?",
      options: ["Tomato", "Avocado", "Onion", "Pepper"],
      answer: "Avocado"
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"],
      answer: "William Shakespeare"
    },
    {
      question: "What is the hardest natural substance on Earth?",
      options: ["Gold", "Iron", "Diamond", "Quartz"],
      answer: "Diamond"
    },
    {
      question: "What is the capital of Japan?",
      options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
      answer: "Tokyo"
    },
    {
      question: "Which gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      answer: "Carbon Dioxide"
    },
    {
      question: "What is the smallest prime number?",
      options: ["0", "1", "2", "3"],
      answer: "2"
    },
    {
      question: "What is the largest mammal in the world?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
      answer: "Blue Whale"
    },
    {
      question: "Which element has the atomic number 1?",
      options: ["Helium", "Oxygen", "Hydrogen", "Carbon"],
      answer: "Hydrogen"
    },
    {
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
      answer: "Canberra"
    },
    {
      question: "Which organ is responsible for pumping blood throughout the body?",
      options: ["Liver", "Lungs", "Heart", "Kidneys"],
      answer: "Heart"
    },
    {
      question: "What is the main language spoken in Brazil?",
      options: ["Spanish", "Portuguese", "English", "French"],
      answer: "Portuguese"
    },
    {
      question: "What is the freezing point of water?",
      options: ["0°C", "100°C", "32°F", "212°F"],
      answer: "0°C"
    },
    {
      question: "Which planet is known for its rings?",
      options: ["Earth", "Mars", "Saturn", "Neptune"],
      answer: "Saturn"
    },
    {
      question: "What is the capital of Canada?",
      options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
      answer: "Ottawa"
    },
    {
      question: "What is the largest continent on Earth?",
      options: ["Africa", "Asia", "North America", "South America"],
      answer: "Asia"
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
      answer: "Leonardo da Vinci"
    },
    {
      question: "What is the main currency used in Japan?",
      options: ["Yen", "Won", "Dollar", "Euro"],
      answer: "Yen"
    },
    {
      question: "What is the capital of Italy?",
      options: ["Rome", "Florence", "Venice", "Milan"],
      answer: "Rome"
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  let timeLeft = 15;
  
  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const feedbackEl = document.getElementById('feedback');
  const nextBtn = document.getElementById('next-btn');
  const scoreEl = document.getElementById('score');
  const restartBtn = document.getElementById('restart-btn');
  const scoreContainer = document.getElementById('score-container');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const timeEl = document.getElementById('time');
  
  function loadQuestion() {
    feedbackEl.textContent = '';
    nextBtn.style.display = 'none';
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
  
    optionsEl.innerHTML = '';
    currentQuestion.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.className = "w-full py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400 transition-all font-medium shadow-sm";
      button.onclick = () => checkAnswer(option, button);
      optionsEl.appendChild(button);
    });
  
    // Timer
    timeLeft = 15;
    timeEl.textContent = timeLeft;
    clearInterval(timer);
    timer = setInterval(() => {
      timeLeft--;
      timeEl.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        feedbackEl.textContent = `Time's up! Correct: ${currentQuestion.answer}`;
        markCorrectAnswer();
        Array.from(optionsEl.children).forEach(btn => btn.disabled = true);
        nextBtn.style.display = 'block';
      }
    }, 1000);
  
    // Update progress
    const progressPercent = Math.round((currentQuestionIndex / questions.length) * 100);
    progressBar.style.width = `${progressPercent}%`;
    progressText.textContent = `${progressPercent}%`;
  }
  
  function checkAnswer(selected, btn) {
    clearInterval(timer);
    const currentQuestion = questions[currentQuestionIndex];
  
    if (selected === currentQuestion.answer) {
      feedbackEl.textContent = 'Correct!';
      score++;
      btn.classList.add('bg-green-500', 'text-white', 'shadow-lg', 'scale-105');
    } else {
      feedbackEl.textContent = `Wrong! Correct: ${currentQuestion.answer}`;
      btn.classList.add('bg-red-500', 'text-white', 'shadow-lg', 'scale-105');
      markCorrectAnswer();
    }
  
    Array.from(optionsEl.children).forEach(b => b.disabled = true);
    nextBtn.style.display = 'block';
  }
  
  function markCorrectAnswer() {
    Array.from(optionsEl.children).forEach(btn => {
      if (btn.textContent === questions[currentQuestionIndex].answer) {
        btn.classList.add('bg-green-500', 'text-white', 'shadow-lg');
      }
    });
  }
  
  nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showScore();
    }
  });
  
  function showScore() {
    questionEl.textContent = 'Quiz Finished!';
    optionsEl.innerHTML = '';
    feedbackEl.textContent = '';
    nextBtn.style.display = 'none';
    scoreEl.textContent = `Your Score: ${score} / ${questions.length}`;
    scoreContainer.classList.remove('hidden');
    progressBar.style.width = `100%`;
    progressText.textContent = '100%';
  }
  
  restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add('hidden');
    loadQuestion();
  });
  
  // Start quiz
  loadQuestion();
  