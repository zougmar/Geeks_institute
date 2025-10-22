import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleTask, editTask } from "../features/tasksSlice";

function TaskItem({ task, date, onEdit }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg shadow-sm mb-2 hover:shadow-md transition-all">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => dispatch(toggleTask({ date, id: task.id }))}
          className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
        />
        <span
          className={`text-gray-800 ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.text}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          className="text-sm px-3 py-1 border border-gray-300 rounded-lg hover:bg-indigo-100"
          onClick={() => onEdit(task)}
        >
          ✏️ Edit
        </button>
        <button
          className="text-sm px-3 py-1 border border-red-300 text-red-600 rounded-lg hover:bg-red-100"
          onClick={() => dispatch(deleteTask({ date, id: task.id }))}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default function TaskList({ selectedDate }) {
  const tasks = useSelector(
    (state) => state.tasks.tasksByDate[selectedDate] || []
  );
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState("");

  const startEdit = (task) => {
    setEditing(task.id);
    setEditText(task.text);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    if (!editText.trim()) return;
    dispatch(
      editTask({
        date: selectedDate,
        id: editing,
        updates: { text: editText.trim() },
      })
    );
    setEditing(null);
    setEditText("");
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Tasks for {selectedDate} ({tasks.length})
      </h2>

      {tasks.length === 0 && (
        <p className="text-gray-500 text-center py-6">No tasks for this day</p>
      )}

      {tasks.map((task) =>
        editing === task.id ? (
          <form
            key={task.id}
            onSubmit={saveEdit}
            className="flex items-center gap-2 mb-2 bg-gray-50 p-3 rounded-lg shadow-sm"
          >
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
              type="submit"
            >
              Save
            </button>
            <button
              type="button"
              className="px-3 py-1 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              onClick={() => setEditing(null)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <TaskItem key={task.id} task={task} date={selectedDate} onEdit={startEdit} />
        )
      )}
    </div>
  );
}
