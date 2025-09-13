//------1------
const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];

const result = ['bread', ...vegetables, 'chicken', ...fruits];
console.log(result);
// Output: ["bread", "carrot", "potato", "chicken", "apple", "orange"]


const country = "USA";
console.log([...country]);
// Output: ["U", "S", "A"]


let newArray = [...[,,]];
console.log(newArray);
// Output: [undefined, undefined]
