import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo } from '../redux/actions';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <li className="flex justify-between items-center border-b py-2">
      <span
        onClick={() => dispatch(toggleTodo(todo.id))}
        className={`cursor-pointer ${
          todo.completed ? 'line-through text-gray-500' : ''
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => dispatch(removeTodo(todo.id))}
        className="text-red-500 hover:underline"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
