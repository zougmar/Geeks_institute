const input = document.querySelector("input")

const h2 = document.querySelector("h2")
input.addEventListener("kayup", display)
function display(){
  h2.innerHTML = input.value
}