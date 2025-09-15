//1st daily challenge

// Function 1: makeAllCaps
function makeAllCaps(words) {
  return new Promise((resolve, reject) => {
    if (words.every(word => typeof word === "string")) {
      resolve(words.map(word => word.toUpperCase()));
    } else {
      reject("Error: Not all elements are strings ❌");
    }
  });
}

// Function 2: sortWords
function sortWords(words) {
  return new Promise((resolve, reject) => {
    if (words.length > 4) {
      resolve(words.sort());
    } else {
      reject("Error: Array length is too short ❌");
    }
  });
}

// --- TESTS ---
// 1. Rejects because array contains a number
makeAllCaps([1, "pear", "banana"])
  .then(arr => sortWords(arr))
  .then(result => console.log(result))
  .catch(error => console.log(error));

// 2. Rejects because length <= 4
makeAllCaps(["apple", "pear", "banana"])
  .then(arr => sortWords(arr))
  .then(result => console.log(result))
  .catch(error => console.log(error));

// 3. Works fine -> Uppercased + Sorted
makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
  .then(arr => sortWords(arr))
  .then(result => console.log(result)) 
  .catch(error => console.log(error));



// 2nd daily challenge

const morse = `{
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}`;

// Function 1: Convert JSON string to object
function toJs() {
  return new Promise((resolve, reject) => {
    const morseObj = JSON.parse(morse);
    if (Object.keys(morseObj).length === 0) {
      reject("Error: Morse object is empty ❌");
    } else {
      resolve(morseObj);
    }
  });
}

// Function 2: Convert user input to morse array
function toMorse(morseJS) {
  return new Promise((resolve, reject) => {
    const userInput = prompt("Enter a word or sentence:").toLowerCase();
    const chars = userInput.split("");

    let translation = [];

    for (let char of chars) {
      if (!morseJS[char]) {
        reject(`Error: Character '${char}' not supported ❌`);
        return;
      }
      translation.push(morseJS[char]);
    }

    resolve(translation);
  });
}

// Function 3: Display result on DOM
function joinWords(morseTranslation) {
  const container = document.createElement("div");
  container.innerHTML = morseTranslation.join("<br>");
  document.body.appendChild(container);
}

// --- Chain everything ---
toJs()
  .then(morseObj => toMorse(morseObj))
  .then(morseTranslation => joinWords(morseTranslation))
  .catch(error => console.log(error));
