// Part I:


function makeJuice(size) {
    function addIngredients(ing1, ing2, ing3) {
        document.body.innerHTML += 
        `The client wants a ${size} juice, containing ${ing1}, ${ing2}, ${ing3}.<br>`;
    }
    addIngredients("apple", "banana", "orange"); 
}

makeJuice("large");

// Part II:


function makeJuice(size) {
    let ingredients = []; 

    function addIngredients(ing1, ing2, ing3) {
        ingredients.push(ing1, ing2, ing3);
    }

    function displayJuice() {
        document.body.innerHTML += 
        `The client wants a ${size} juice, containing ${ingredients.join(", ")}.<br>`;
    }

   
    addIngredients("apple", "banana", "orange");
    addIngredients("mango", "kiwi", "pineapple");

    displayJuice(); 
}

makeJuice("medium");
