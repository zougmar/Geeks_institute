import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteTask, editTask } from "../actions";

function TaskList({ tasks = [], selectedDay, deleteTask, editTask }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDesc(task.description || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDesc("");
  };

  const saveEdit = () => {
    if (!editTitle.trim()) return alert("Title cannot be empty");
    editTask(selectedDay, editingId, {
      title: editTitle,
      description: editDesc,
    });
    cancelEdit();
  };

  if (!tasks.length)
    return (
      <div className="text-center text-gray-500 italic py-6">
        No tasks for {selectedDay}
      </div>
    );

  return (
    <ul className="divide-y divide-gray-200">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex justify-between items-start py-3 px-2 hover:bg-gray-50 rounded-lg transition"
        >
          {editingId === task.id ? (
            <div className="flex flex-col w-full gap-2">
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 text-sm"
              />
              <input
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 text-sm"
              />
              <div className="flex gap-2">
                <button
                  onClick={saveEdit}
                  className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-400 text-white text-sm px-3 py-1 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex w-full justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">{task.title}</h3>
                {task.description && (
                  <p className="text-sm text-gray-500">{task.description}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(task)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(selectedDay, task.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

const mapState = (state) => ({
  tasks: state.tasksByDay[state.selectedDay] || [],
  selectedDay: state.selectedDay,
});
export default connect(mapState, { deleteTask, editTask })(TaskList);
