// app.js
const _ = require('lodash'); // Import lodash
const math = require('./math'); // Import custom math module

// Using custom module
const sum = math.add(10, 20);
const product = math.multiply(5, 6);

// Using lodash
const numbers = [1, 2, 3, 4, 5, 6];
const chunked = _.chunk(numbers, 2);
const maxNum = _.max(numbers);

console.log("Sum:", sum);               // 30
console.log("Product:", product);       // 30
console.log("Chunked Array:", chunked); // [[1,2], [3,4], [5,6]]
console.log("Max Number:", maxNum);     // 6
