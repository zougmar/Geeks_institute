import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasksSlice";

export default function AddTask({ selectedDate }) {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    dispatch(addTask({ date: selectedDate, text: trimmed }));
    setText("");
  };

  return (
    <form
      onSubmit={submit}
      className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg shadow-sm"
    >
      <input
        className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder={`Add task for ${selectedDate}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
        type="submit"
      >
        Add
      </button>
    </form>
  );
}
