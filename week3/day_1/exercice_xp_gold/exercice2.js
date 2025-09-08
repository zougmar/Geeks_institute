let guestList = {
  randy: "Germany",
  karla: "France",
  wendy: "Japan",
  norman: "England",
  sam: "Argentina"
};

// Prompt the user for their name
let name = prompt("Enter your name:");

// Convert input to lowercase to match object keys (optional)
let lowerName = name.toLowerCase();

// Check if the name exists in the guestList object
if (guestList[lowerName]) {
  console.log(`Hi! I'm ${name}, and I'm from ${guestList[lowerName]}.`);
} else {
  console.log(`Sorry, ${name} is not on the guest list.`);
}
