// Initial quotes array
let quotes = [
  { id: 0, author: "Albert Einstein", quote: "Life is like riding a bicycle. To keep your balance, you must keep moving.", likes: 0 },
  { id: 1, author: "Oscar Wilde", quote: "Be yourself; everyone else is already taken.", likes: 0 },
  { id: 2, author: "Maya Angelou", quote: "You will face many defeats in life, but never let yourself be defeated.", likes: 0 },
];

let lastIndex = -1; // to avoid repeating the same quote
let currentQuote = null;

// DOM elements
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const info = document.getElementById("info");

// Generate random quote
document.getElementById("generate-btn").addEventListener("click", () => {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
  } while (randomIndex === lastIndex);

  lastIndex = randomIndex;
  currentQuote = quotes[randomIndex];
  displayQuote(currentQuote);
});

// Display function
function displayQuote(quote) {
  quoteText.textContent = `"${quote.quote}"`;
  quoteAuthor.textContent = `- ${quote.author} (Likes: ${quote.likes})`;
}

// Add new quote
document.getElementById("add-quote-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const newQuote = document.getElementById("new-quote").value.trim();
  const newAuthor = document.getElementById("new-author").value.trim();

  if (newQuote && newAuthor) {
    const newId = quotes.length;
    quotes.push({ id: newId, author: newAuthor, quote: newQuote, likes: 0 });
    alert("✅ New quote added!");
    e.target.reset();
  }
});

// Character count with spaces
document.getElementById("char-count").addEventListener("click", () => {
  if (currentQuote) {
    info.textContent = `Characters (with spaces): ${currentQuote.quote.length}`;
  }
});

// Character count without spaces
document.getElementById("char-no-space").addEventListener("click", () => {
  if (currentQuote) {
    const noSpaces = currentQuote.quote.replace(/\s+/g, "");
    info.textContent = `Characters (no spaces): ${noSpaces.length}`;
  }
});

// Word count
document.getElementById("word-count").addEventListener("click", () => {
  if (currentQuote) {
    const words = currentQuote.quote.trim().split(/\s+/);
    info.textContent = `Word count: ${words.length}`;
  }
});

// Like button
document.getElementById("like-btn").addEventListener("click", () => {
  if (currentQuote) {
    currentQuote.likes++;
    displayQuote(currentQuote);
  }
});

// Filter by author
document.getElementById("filter-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const author = document.getElementById("filter-author").value.trim().toLowerCase();
  const resultsDiv = document.getElementById("filter-results");
  resultsDiv.innerHTML = "";

  const authorQuotes = quotes.filter(q => q.author.toLowerCase() === author);

  if (authorQuotes.length === 0) {
    resultsDiv.textContent = "No quotes found.";
    return;
  }

  let index = 0;
  const displayAuthorQuote = () => {
    resultsDiv.innerHTML = `
      <p>"${authorQuotes[index].quote}"</p>
      <p>- ${authorQuotes[index].author}</p>
      <button id="prev-btn">Previous</button>
      <button id="next-btn">Next</button>
    `;

    document.getElementById("prev-btn").onclick = () => {
      index = (index - 1 + authorQuotes.length) % authorQuotes.length;
      displayAuthorQuote();
    };

    document.getElementById("next-btn").onclick = () => {
      index = (index + 1) % authorQuotes.length;
      displayAuthorQuote();
    };
  };

  displayAuthorQuote();
});
