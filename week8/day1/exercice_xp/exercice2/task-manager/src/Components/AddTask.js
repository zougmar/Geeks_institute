import React, { useState, useContext } from "react";
import { TaskContext, ACTIONS } from "../context/TaskContext";

const AddTask = () => {
  const [text, setText] = useState("");
  const { dispatch } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    dispatch({ type: ACTIONS.ADD_TASK, payload: { text } });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border rounded-md px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
};

export default AddTask;
