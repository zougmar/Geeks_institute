import React, { useRef, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskInput = () => {
  const { dispatch } = useContext(TaskContext);
  const inputRef = useRef();

  const handleAdd = () => {
    const value = inputRef.current.value.trim();
    if (value) {
      dispatch({ type: "ADD_TASK", payload: value });
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex gap-3 mt-4">
      <input
        ref={inputRef}
        type="text"
        placeholder="Add a new task"
        className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 transition"
      />
      <button
        onClick={handleAdd}
        className="bg-primary text-white px-5 py-3 rounded-xl hover:bg-indigo-600 transition shadow"
      >
        Add
      </button>
    </div>
  );
};

export default TaskInput;
