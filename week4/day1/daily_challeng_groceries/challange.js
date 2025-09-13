let client = "John";

const groceries = {
    fruits : ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice : "20$",
    other : {
        paid : true,
        meansOfPayment : ["cash", "creditCard"]
    }
}


const displayGroceries = () => {
    groceries.fruits.forEach(fruit => console.log(fruit));
};

displayGroceries();

const cloneGroceries = () => {
    
    let user = client;


    client = "Betty";

    console.log("user:", user);       
    console.log("client:", client);   

   
    let shopping = groceries;


    shopping.totalPrice = "35$";

    console.log("groceries.totalPrice:", groceries.totalPrice); 
   
    shopping.other.paid = false;

    console.log("groceries.other.paid:", groceries.other.paid);
};

cloneGroceries();
