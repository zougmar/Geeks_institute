
// 1️⃣ Function declaration
function kgToGrams1(kg) {
    return kg * 1000;
}
console.log(kgToGrams1(5)); // → 5000

// 2️⃣ Function expression
const kgToGrams2 = function(kg) {
    return kg * 1000;
}
console.log(kgToGrams2(3)); // → 3000

// Difference: function declaration is hoisted (can be called before defined),
// function expression is not hoisted

// 3️⃣ One-line arrow function
const kgToGrams3 = kg => kg * 1000;
console.log(kgToGrams3(7)); 
