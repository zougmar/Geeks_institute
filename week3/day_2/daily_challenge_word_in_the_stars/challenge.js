// Prompt the user for input
let input = prompt("Enter several words separated by commas:");

// Convert input string to array (trim spaces)
let words = input.split(",").map(word => word.trim());

// Find the length of the longest word
let maxLength = Math.max(...words.map(word => word.length));

// Create the border (2 spaces for padding + 2 for stars)
let border = "*".repeat(maxLength + 4);

console.log(border);

// Print each word with padding
for (let word of words) {
  let spaces = " ".repeat(maxLength - word.length);
  console.log(`* ${word}${spaces} *`);
}

console.log(border);
