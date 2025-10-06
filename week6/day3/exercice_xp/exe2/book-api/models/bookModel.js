import pool from '../config/db.js';

// Create table if it doesn't exist
export const initTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      author VARCHAR(100) NOT NULL,
      publishedYear INT
    );
  `);
};

// Get all books
export const getAllBooks = async () => {
  const result = await pool.query('SELECT * FROM books');
  return result.rows;
};

// Get one book
export const getBookById = async (id) => {
  const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
  return result.rows[0];
};

// Create book
export const createBook = async (title, author, publishedYear) => {
  const result = await pool.query(
    'INSERT INTO books (title, author, publishedYear) VALUES ($1, $2, $3) RETURNING *',
    [title, author, publishedYear]
  );
  return result.rows[0];
};

// Update book
export const updateBook = async (id, title, author, publishedYear) => {
  const result = await pool.query(
    'UPDATE books SET title=$1, author=$2, publishedYear=$3 WHERE id=$4 RETURNING *',
    [title, author, publishedYear, id]
  );
  return result.rows[0];
};

// Delete book
export const deleteBook = async (id) => {
  await pool.query('DELETE FROM books WHERE id = $1', [id]);
};
