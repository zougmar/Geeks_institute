// Create an array called colors where the value is a list of your five favorite colors.
let colors = ["red", "green", "blue", "yellow", "black"];

for (let i = 0; i < colors.length; i++) {
    console.log('My #' + (i + 1) + ' choice is ' + colors[i]);
}


// bonus

// Create a loop that console.logs each color in the colors array.

let suffixes = ["st", "nd", "rd", "th", "th"];

for (let i = 0; i < colors.length; i++) {
  console.log(`My ${i + 1}${suffixes[i]} choice is ${colors[i]}`);
}
