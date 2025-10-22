import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [
    { id: 1, title: 'Dracula', author: 'Bram Stoker', genre: 'Horror' },
    { id: 2, title: 'Frankenstein', author: 'Mary Shelley', genre: 'Horror' },
    { id: 3, title: 'Harry Potter', author: 'J.K. Rowling', genre: 'Fantasy' },
    { id: 4, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy' },
    { id: 5, title: 'Dune', author: 'Frank Herbert', genre: 'Science Fiction' },
    { id: 6, title: 'Foundation', author: 'Isaac Asimov', genre: 'Science Fiction' },
  ],
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
});

export default booksSlice.reducer;
