const express = require("express");
const router = express.Router();


const books = [];

// ✅ Get all books
router.get("/", (req, res) => {
    res.json(books);
});

// ✅ Add new book
router.post("/", (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) return res.status(400).json({ error: "Title and Author are required" });
    
    const newBook = { id: books.length + 1, title, author };
    books.push(newBook);
    res.status(201).json(newBook);
});
//Get book by ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const book = books.find(b => b.id === parseInt(id));
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
});

// ✅ Update book by ID
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;

    const book = books.find(b => b.id === parseInt(id));
    if (!book) return res.status(404).json({ error: "Book not found" });

    book.title = title;
    book.author = author;
    res.json(book);
});

// ✅ Delete book by ID
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const bookIndex = books.findIndex(b => b.id === parseInt(id));
    if (bookIndex === -1) return res.status(404).json({ error: "Book not found" });

    books.splice(bookIndex, 1);
    res.sendStatus(204);
});

module.exports = router;