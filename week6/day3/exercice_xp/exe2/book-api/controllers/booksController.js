// controllers/booksController.js
import pool from '../config/db.js';

// Get all books
export const getBooks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one book
export const getBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [bookId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new book
export const addBook = async (req, res) => {
  const { title, author, publishedYear } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO books (title, author, publishedYear) VALUES ($1, $2, $3) RETURNING *',
      [title, author, publishedYear]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update book
export const editBook = async (req, res) => {
  const { bookId } = req.params;
  const { title, author, publishedYear } = req.body;
  try {
    const result = await pool.query(
      'UPDATE books SET title=$1, author=$2, publishedYear=$3 WHERE id=$4 RETURNING *',
      [title, author, publishedYear, bookId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete book
export const removeBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    await pool.query('DELETE FROM books WHERE id = $1', [bookId]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
