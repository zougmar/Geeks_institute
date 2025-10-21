import React, { useState } from "react";
import { connect } from "react-redux";
import { addTask } from "../actions";
import { generateId } from "../utils";

function TaskForm({ selectedDay, addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }
    addTask(selectedDay, {
      id: generateId(),
      title: title.trim(),
      description: description.trim(),
    });
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-start sm:items-end gap-3"
    >
      <div className="flex flex-col w-full sm:w-1/3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>
      <div className="flex flex-col w-full sm:w-1/3">
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add Task
      </button>
    </form>
  );
}

const mapState = (state) => ({ selectedDay: state.selectedDay });
export default connect(mapState, { addTask })(TaskForm);
