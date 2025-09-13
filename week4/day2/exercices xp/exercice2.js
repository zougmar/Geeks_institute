const colors2 = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
const ordinal = ["th", "st", "nd", "rd"];

colors2.forEach((color, index) => {
  let n = index + 1;

  let suffix = (n === 1) ? ordinal[1] :
               (n === 2) ? ordinal[2] :
               (n === 3) ? ordinal[3] :
               ordinal[0];
  console.log(`${n}${suffix} choice is ${color}.`);
});
