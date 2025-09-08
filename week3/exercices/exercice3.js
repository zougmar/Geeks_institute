let num = Number(prompt("Enter a number:"));  

while (num < 10) {
  num = Number(prompt("The number is too small. Enter a new number:"));
}

console.log(`Great! You entered ${num}, which is >= 10`);
typeof prompt("test"); 
