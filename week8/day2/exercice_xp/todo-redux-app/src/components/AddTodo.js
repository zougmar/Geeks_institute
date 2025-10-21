import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/actions';

const AddTodo = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new todo..."
        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition">
        Add
      </button>
    </form>
  );
};

export default AddTodo;
