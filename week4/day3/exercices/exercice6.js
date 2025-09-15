// 1 
// console.log([2] === [2]); // false
// console.log({} === {});   // false
// because they are different references in memory, the objects and arrays are compared by reference, not by value.

// 2
const object1 = { number: 5 }; 
const object2 = object1; 
const object3 = object2; 
const object4 = { number: 5};

object1.number = 4;
console.log(object2.number)
console.log(object3.number)
console.log(object4.number)

// object1, object2, object3 all point to the same memory reference.
// object4 is a new object with its own copy.

// 3

class Animal {
  constructor(name, type, color) {
    this.name = name;
    this.type = type;
    this.color = color;
  }
}

class Mammal extends Animal {
  sound(noise) {
    return `${noise} I'm a ${this.type}, named ${this.name} and I'm ${this.color}`;
  }
}

const farmerCow = new Mammal("Lily", "cow", "brown and white");
console.log(farmerCow.sound("Moooo"));
// the output will be: "Moooo I'm a cow, named Lily and I'm brown and white"