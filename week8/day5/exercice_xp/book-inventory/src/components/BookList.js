import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectBooks,
  selectHorrorBooks,
  selectFantasyBooks,
  selectScienceFictionBooks
} from '../features/books/booksSelectors';

const BookList = () => {
  const [genre, setGenre] = useState('All');

  const allBooks = useSelector(selectBooks);
  const horrorBooks = useSelector(selectHorrorBooks);
  const fantasyBooks = useSelector(selectFantasyBooks);
  const sciFiBooks = useSelector(selectScienceFictionBooks);

  const getBooksByGenre = () => {
    switch(genre) {
      case 'Horror': return horrorBooks;
      case 'Fantasy': return fantasyBooks;
      case 'Science Fiction': return sciFiBooks;
      default: return allBooks;
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Book Inventory</h1>
      <div className="mb-4">
        <button className="btn mr-2" onClick={() => setGenre('All')}>All</button>
        <button className="btn mr-2" onClick={() => setGenre('Horror')}>Horror</button>
        <button className="btn mr-2" onClick={() => setGenre('Fantasy')}>Fantasy</button>
        <button className="btn" onClick={() => setGenre('Science Fiction')}>Sci-Fi</button>
      </div>
      <ul className="space-y-2">
        {getBooksByGenre().map(book => (
          <li key={book.id} className="p-2 border rounded hover:bg-gray-50">
            <strong>{book.title}</strong> by {book.author} ({book.genre})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
