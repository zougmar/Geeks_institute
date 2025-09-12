function funcOne() {
    let a = 5;
    if(a > 1) {
        a = 3;
    }
    alert(`inside the funcOne function ${a}`);
}
console.log(funcOne());

// the function will return 3 because the variable a is declared with let so it will changes to 3 because of the condition if