function compareToTen(num) {
  return new Promise((resolve, reject) => {
    if (num <= 10) {
      resolve(`${num} is less than or equal to 10`);
    } else {
      reject(`${num} is greater than 10`);
    }
  });
}

// Test examples
compareToTen(15)
  .then(result => console.log(result)) // Will be rejected
  .catch(error => console.log(error));

compareToTen(8)
  .then(result => console.log(result)) // Will be resolved
  .catch(error => console.log(error));
