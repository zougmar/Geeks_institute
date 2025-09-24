
// Import the array from data.js
import people from "./data.js";

// Function to calculate average age
function calculateAverageAge(persons) {
  if (persons.length === 0) return 0;

  const totalAge = persons.reduce((sum, person) => sum + person.age, 0);
  return totalAge / persons.length;
}

// Use the function with the imported data
const avgAge = calculateAverageAge(people);

console.log("👥 People:", people);
console.log("📊 Average Age:", avgAge);
