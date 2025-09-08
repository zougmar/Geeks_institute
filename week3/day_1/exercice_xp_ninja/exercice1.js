const person1 = {
  fullName: "Alice Johnson",
  mass: 68,   // kg
  height: 1.65, // meters
  calcBMI: function() {
    this.bmi = this.mass / (this.height ** 2); // store BMI as a new property
    return this.bmi;
  }
};

const person2 = {
  fullName: "Bob Smith",
  mass: 85,    // kg
  height: 1.8, // meters
  calcBMI: function() {
    this.bmi = this.mass / (this.height ** 2);
    return this.bmi;
  }
};

person1.calcBMI();
person2.calcBMI();


function compareBMI(p1, p2) {
  if (p1.bmi > p2.bmi) {
    console.log(`${p1.fullName} has the higher BMI of ${p1.bmi.toFixed(2)}`);
  } else if (p2.bmi > p1.bmi) {
    console.log(`${p2.fullName} has the higher BMI of ${p2.bmi.toFixed(2)}`);
  } else {
    console.log(`Both ${p1.fullName} and ${p2.fullName} have the same BMI of ${p1.bmi.toFixed(2)}`);
  }
}

compareBMI(person1, person2);

