import React from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, removeTodo } from "../redux/todoSlice";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded">
      <span
        onClick={() => dispatch(toggleTodo(todo.id))}
        className={`cursor-pointer ${
          todo.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => dispatch(removeTodo(todo.id))}
        className="text-red-500"
      >
        ❌
      </button>
    </div>
  );
};

export default TodoItem;
