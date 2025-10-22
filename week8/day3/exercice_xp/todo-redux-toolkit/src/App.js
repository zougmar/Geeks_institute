import React from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded">
      <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
        📝 Redux Toolkit Todo List
      </h1>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default App;
