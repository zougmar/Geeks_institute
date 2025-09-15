function allTruthy(...args) {
  return args.every(value => Boolean(value));
}

// true
console.log(allTruthy(true, true, true));

// false
console.log(allTruthy(true, false, true));

// false
console.log(allTruthy(5, 4, 3, 2, 1, 0));     
