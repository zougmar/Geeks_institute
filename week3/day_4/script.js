// script.js
const grid = document.getElementById("grid");
const colorPicker = document.getElementById("colorPicker");

let currentColor = colorPicker.value;
let isDrawing = false;

// Update color when user changes it
colorPicker.addEventListener("input", () => {
  currentColor = colorPicker.value;
});

// Create grid of squares
for (let i = 0; i < 400; i++) {
  const square = document.createElement("div");
  square.classList.add("square");

  // Mouse events for drawing
  square.addEventListener("mousedown", () => {
    isDrawing = true;
    square.style.backgroundColor = currentColor;
  });

  square.addEventListener("mouseover", () => {
    if (isDrawing) {
      square.style.backgroundColor = currentColor;
    }
  });

  square.addEventListener("mouseup", () => {
    isDrawing = false;
  });

  grid.appendChild(square);
}

// Stop drawing when mouse is released anywhere
document.body.addEventListener("mouseup", () => {
  isDrawing = false;
});
