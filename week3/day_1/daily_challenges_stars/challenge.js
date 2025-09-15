let pattern1 = "";

for (let i = 1; i <= 6; i++) { 
    pattern1 += "* ".repeat(i) + "\n";  
}

console.log(pattern1);

//
let rows = 6; 
pattern2 = ""

for (let i = 1; i <= rows; i++) {
  for (let j = 1; j <= i; j++) {
    pattern2 += "* ";
  }
  pattern2 += "\n";
}

console.log(pattern2);
