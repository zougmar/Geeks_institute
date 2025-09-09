// 1. Retrieve the form
const form = document.querySelector("form");
console.log("Form:", form);

// 2. Retrieve the inputs by their id
const inputFname = document.getElementById("fname");
const inputLname = document.getElementById("lname");
console.log("Inputs by ID:", inputFname, inputLname);

// 3. Retrieve the inputs by their name attribute
const inputByNameF = document.getElementsByName("firstname")[0];
const inputByNameL = document.getElementsByName("lastname")[0];
console.log("Inputs by NAME:", inputByNameF, inputByNameL);

// 4. Handle form submission
form.addEventListener("submit", function (event) {
  // prevent page reload
  event.preventDefault();

  // get values
  const fnameValue = inputFname.value.trim();
  const lnameValue = inputLname.value.trim();

  // check not empty
  if (fnameValue === "" || lnameValue === "") {
    alert("Both fields are required!");
    return;
  }

  // target UL
  const usersAnswer = document.querySelector(".usersAnswer");

  // create li for first name
  const liF = document.createElement("li");
  liF.textContent = fnameValue;

  // create li for last name
  const liL = document.createElement("li");
  liL.textContent = lnameValue;

  // append to UL
  usersAnswer.appendChild(liF);
  usersAnswer.appendChild(liL);

  // clear inputs
  inputFname.value = "";
  inputLname.value = "";
});
