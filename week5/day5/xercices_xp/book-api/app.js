// app.js
import express from "express";
const app = express();
const port = 5000;
// Middleware to parse JSON
app.use(express.json());


// Sample data array
const books = [
  { id: 1, title: "1984", author: "George Orwell", publishedYear: 1949 },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", publishedYear: 1960 },
  { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", publishedYear: 1925 }
];

// GET all books
app.get("/books", (req, res) => {
    console.log(books)
  res.json(books);
});

// GET a single book by ID
app.get("/api/books/:bookId", (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const book = books.find(b => b.id === bookId);

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// POST a new book
app.post("/api/books", (req, res) => {
  const { title, author, publishedYear } = req.body;
  const newBook = {
    id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
    title,
    author,
    publishedYear
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// Start the server

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
