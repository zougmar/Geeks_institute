import React from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

const App = () => {
  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-md rounded">
      <h1 className="text-2xl font-bold text-center mb-4">📝 Redux Todo List</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default App;
