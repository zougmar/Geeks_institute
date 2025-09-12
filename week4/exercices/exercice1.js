function funcOne() {
    let a = 5;
    if(a > 1) {
        a = 3;
    }
    alert(`inside the funcOne function ${a}`);
}
console.log(funcOne());
//  #1.2 What will happen if the variable is declared 
// with const instead of let ?
// It will give an error because we can't reassign a value to a constant variable.