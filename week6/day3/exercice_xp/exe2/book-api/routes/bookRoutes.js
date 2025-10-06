import express from 'express';
import { getBooks, getBook, addBook, editBook, removeBook } from '../controllers/booksController.js';

const router = express.Router();

router.get('/', getBooks);
router.get('/:bookId', getBook);
router.post('/', addBook);
router.put('/:bookId', editBook);
router.delete('/:bookId', removeBook);

export default router;
