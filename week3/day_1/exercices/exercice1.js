// Part 1  
const people = ["Greg", "Mary", "Devon", "James"];

//remove “Greg” from the people array.
let remove_item = people.splice(0, 1);
// console.log(remove_item);
// 2 replace “James” to “Jason”.
let change_item = people.splice(2, 1, "Jason");
console.log(change_item);
// 3 add your name to the end of the people array.
let add_item = people.push("omar");
console.log(people);
// 4 console.logs Mary’s index
console.log(people.indexOf("Mary"));

// 5 make a copy of the people array using the slice method.
let peopleCopy = people.slice(1, 3);
console.log(peopleCopy); // ["Devon", "Jason"]



// Part 2 (loops)

// 1 loop through the people array and console.log each person
for (let i = 0; i < people.length; i++) {
    console.log(people[i]);
}
/* 2 Using a loop, iterate through the people array and exit the loop after you console.log “Devon” .
Hint: take a look at the break statement in the lesson.*/
for (let i = 0; i < people.length; i++) {
    if (people[i] === "Devon") {
        console.log(people[i]);
        break;
    }
}

