class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
  }
}

const counterOne = new Counter();
counterOne.increment(); // count = 1
counterOne.increment(); // count = 2

const counterTwo = counterOne; // counterTwo references the same object
counterTwo.increment();         // count = 3

console.log(counterOne.count);

// Output: 3 because counterOne and counterTwo reference the same object in memory.