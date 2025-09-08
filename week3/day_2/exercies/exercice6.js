// 2. Change the value of the id attribute from navBar to socialNetworkNavigation
let navDiv = document.getElementById("navBar");
navDiv.setAttribute("id", "socialNetworkNavigation");

// 3. Create a new <li>
let newLi = document.createElement("li");

// Create a text node with "Logout"
let logoutText = document.createTextNode("Logout");

// Append the text node to the <li>
newLi.appendChild(logoutText);

// Append the new <li> to the <ul>
let ul = navDiv.querySelector("ul");
ul.appendChild(newLi);

// 6. Retrieve the first and last <li> elements
let firstLi = ul.firstElementChild;
let lastLi = ul.lastElementChild;

// 7. Display their text
console.log("First link:", firstLi.textContent);
console.log("Last link:", lastLi.textContent);
