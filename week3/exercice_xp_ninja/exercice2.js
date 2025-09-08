function findAvg(gradesList) {
  // Calculate the sum of all grades
  let sum = 0;
  for (let i = 0; i < gradesList.length; i++) {
    sum += gradesList[i];
  }

  // Calculate the average
  let avg = sum / gradesList.length;

  // Display the average
  console.log(`Your average is: ${avg.toFixed(2)}`);

  // Check pass/fail
  if (avg >= 65) {
    console.log("Congratulations! You passed.");
  } else {
    console.log("You failed and must repeat the course.");
  }
}

let grades1 = [70, 80, 60, 90];
let grades2 = [50, 55, 60, 58];

findAvg(grades1);
findAvg(grades2);

