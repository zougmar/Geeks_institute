// 1. Retrieve the div and console.log it
let divContainer = document.getElementById("container");
console.log(divContainer);

// 2. Change the name “Pete” to “Richard”
let firstList = document.querySelector(".list"); // first <ul>
firstList.children[1].textContent = "Richard";

// Delete the second <li> of the second <ul>
let secondList = document.querySelectorAll(".list")[1];
secondList.children[1].remove(); // removes "Sarah"

// Change the name of the first <li> of each <ul> to your name
let allLists = document.querySelectorAll(".list");
allLists.forEach(ul => {
  ul.children[0].textContent = "Omar"; // replace first element
});

// 3. Add a class called student_list to both of the <ul>'s
allLists.forEach(ul => {
  ul.classList.add("student_list");
});
// Add the classes university and attendance to the first <ul>
firstUl.classList.add("university", "attendance");

// 4. Add a “light blue” background color and some padding to the <div>

divContainer.style.backgroundColor = "lightblue";
divContainer.style.padding = "10px";

// Do not display the <li> that contains the text node “Dan”

let danLi = Array.from(document.querySelectorAll("li"))
                 .find(li => li.textContent === "Dan");
if (danLi) {
  danLi.style.display = "none";
}
// Add a border to the <li> that contains the text node “Richard”

let richardLi = Array.from(document.querySelectorAll("li"))
                     .find(li => li.textContent === "Richard");
if (richardLi) {
  richardLi.style.border = "2px solid black";
}

// Change the font size of the whole body
document.body.style.fontSize = "18px";
