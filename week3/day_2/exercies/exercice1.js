// Find the numbers divisible by 23

let sum = 0;
function displayNumbersDivisible() {
    for (let i = 0; i <= 500; i++) {
      if (i % 23 === 0) {
        console.log(i);
        sum += i;
      }
    }
}

displayNumbersDivisible();