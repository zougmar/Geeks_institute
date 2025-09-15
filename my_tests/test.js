const car = {
  brand: "Toyota",
  model: "Corolla",
  year: 2020,
  owner: {
    name: "Omar",
    age: 25
  }
};

let { brand, model, year, owner: { name, age } } = car;

console.log(`car : ${brand} ${model} (${year})
owner : ${name},  ${age} years old`);