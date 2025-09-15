// Promise that resolves immediately with value 3
const resolvedPromise = Promise.resolve(3);
resolvedPromise.then(result => console.log(result)); // Output: 3

// Promise that rejects immediately with string "Boo!"
const rejectedPromise = Promise.reject("Boo!");
rejectedPromise.catch(error => console.log(error)); // Output: Boo!
