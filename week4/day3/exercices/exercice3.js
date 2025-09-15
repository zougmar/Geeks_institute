const users = { user1: 18273, user2: 92833, user3: 90315 };

// Part 1: 
const usersArray = Object.entries(users);
console.log(usersArray);

// Part 2:
const updatedUsers = usersArray.map(([key, value]) => [key, value * 2]);
console.log(updatedUsers);
