// 1
function hotelCost() {
  let nights;

  while (true) {
    nights = prompt("How many nights would you like to stay in the hotel?");
    nights = Number(nights); 

    if (!isNaN(nights) && nights > 0) {
      break; 
    } else {
      alert("Please enter a valid number of nights.");
    }
  }

  let total = nights * 140;
  return total;
}
let cost = hotelCost();
console.log("Total hotel cost: $" + cost);

// 2 
function planeRideCost() {
  let destination;

  while (true) {
    destination = prompt("What is your travel destination?");
    
   
    if (destination && isNaN(destination)) {
      destination = destination.toLowerCase();
      break;
    } else {
      alert("Please enter a valid destination.");
    }
  }


  if (destination === "london") {
    return 183;
  } else if (destination === "paris") {
    return 220;
  } else {
    return 300;
  }
}

let cost_price = planeRideCost();
console.log("Plane ticket cost: $" + cost);
