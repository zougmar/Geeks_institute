// #1
function funcOne() {
    let a = 5;
    if(a > 1) {
        a = 3;
    }
    alert(`inside the funcOne function ${a}`); // → 3
}
funcOne()
// With const → Error: Assignment to constant variable



// #2
// let a = 0;
function funcTwo() {
    a = 5;
}
function funcThree() {
    alert(`inside the funcThree function ${a}`);
}
funcThree() // → 0
funcTwo()
funcThree() // → 5
// With const → Error: Assignment to constant variable



// #3
function funcFour() {
    window.a = "hello";
}
function funcFive() {
    alert(`inside the funcFive function ${a}`);
}
funcFour()
funcFive() // → hello
// With const → works the same



// #4
// let a = 1;
function funcSix() {
    let a = "test";
    alert(`inside the funcSix function ${a}`); // → test
}
funcSix()
// With const → works the same



// #5
let a = 2;
if (true) {
    let a = 5;
    alert(`in the if block ${a}`); // → 5
}
alert(`outside of the if block ${a}`); // → 2
// With const → works the same
