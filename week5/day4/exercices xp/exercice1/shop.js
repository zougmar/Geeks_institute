
// Import products from products.js
const products = require("./products");

// Function to search for a product by name
function findProduct(productName) {
  const product = products.find(
    (item) => item.name.toLowerCase() === productName.toLowerCase()
  );

  if (product) {
    console.log("✅ Product found:");
    console.log(product);
  } else {
    console.log(`❌ Product "${productName}" not found.`);
  }
}

// Test the function with different names
findProduct("Laptop");
findProduct("Mouse");
findProduct("Book");
findProduct("Camera"); // this one doesn’t exist
