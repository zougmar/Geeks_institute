// Step 1: Create the array of books
const allBooks = [
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    image: "https://covers.openlibrary.org/b/id/7984916-L.jpg",
    alreadyRead: true
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    image: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
    alreadyRead: false
  }
];

// Step 2: Get the section from the DOM
const bookSection = document.querySelector(".listBooks");

// Step 3: Loop through books and render them
allBooks.forEach(book => {
  // Create a container div for each book
  const bookDiv = document.createElement("div");

  // Create text for title + author
  const bookDetails = document.createElement("p");
  bookDetails.textContent = `${book.title} written by ${book.author}`;

  // If book already read, make text red
  if (book.alreadyRead) {
    bookDetails.style.color = "red";
  }

  // Create an image element
  const bookImg = document.createElement("img");
  bookImg.src = book.image;
  bookImg.style.width = "100px";

  // Add text + image to the book div
  bookDiv.appendChild(bookDetails);
  bookDiv.appendChild(bookImg);

  // Add book div to the section
  bookSection.appendChild(bookDiv);
});
