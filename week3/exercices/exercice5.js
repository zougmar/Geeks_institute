// 1 Create an object called family with a few key value pairs. 

const family = {
  father: "M'bark",
  mother: "Fatima",
  brother: "Hassan",
  sister: "Zahara"
};
// 2 Using a for in loop, console.log the keys of the object.
for (let member in family) {
  console.log(member);
}

// Using a for in loop, console.log the values of the object.

for (let member in family) {
  console.log(family[member]);
}

