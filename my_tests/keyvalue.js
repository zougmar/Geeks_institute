let myObj = {
    name : "John",
    lastName : "Doe",
    age : 25,
    friends : ["Mark", "Lucie", "Ana"]
}

let keys = Object.keys(myObj);
let values = Object.values(myObj);

console.log(`The object has ${keys.length} keys and ${values.length} values`);

keys.forEach((key, index) => {
      console.log(`The ${index + 1}# key is : ${key} --- The ${index + 1}# value is : ${values[index]}`);
});