// Select the first paragraph
const h1 = document.querySelector("h1");
console.log(h1);
// Remove the last paragraph    
const article = document.querySelector("article");
const lastparagraph = article.querySelector("p:last-child");
lastparagraph.remove();

// change background color of h2 to red when it's clicked on
const h2 = document.querySelector("h2");
h2.addEventListener("click", () => {
    h2.style.backgroundColor = "red";
});
// event listener which will hide the h3 when it’s clicked on (use the display:none property).

const h3 = document.querySelector("h3");
h3.addEventListener("hide", () => {
    h3.style.backgroundColor = "red";
});
// Add a <button> to the HTML file, that when clicked on, should make the text of all the paragraphs, bold.
const button = document.querySelector("button");
button.addEventListener("click", () => {
    const paragraphs = document.querySelectorAll("p");
    paragraphs.forEach((paragraph) => {
        paragraph.style.fontWeight = "bold";
    });
});