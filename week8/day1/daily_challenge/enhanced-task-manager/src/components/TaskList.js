import React, { useContext, useState, useRef } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskList = () => {
  const { state, dispatch } = useContext(TaskContext);
  const [editingId, setEditingId] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const editRef = useRef();

  const filteredTasks = state.tasks.filter(task => {
    if (state.filter === "all") return true;
    if (state.filter === "completed") return task.completed;
    if (state.filter === "active") return !task.completed;
    return true;
  });

  const handleEdit = task => {
    setEditingId(task.id);
    editRef.current.value = task.text;
  };

  const handleSave = task => {
    const newText = editRef.current.value.trim();
    if (newText) {
      dispatch({ type: "EDIT_TASK", payload: { id: task.id, text: newText } });
      setEditingId(null);
    }
  };

  const handleDelete = id => {
    setRemovingId(id);
    setTimeout(() => {
      dispatch({ type: "DELETE_TASK", payload: id });
      setRemovingId(null);
    }, 300);
  };

  return (
    <ul className="mt-5 space-y-3">
      {filteredTasks.map(task => (
        <li
          key={task.id}
          className={`flex items-center justify-between p-3 border rounded-xl transition-all duration-300 bg-gray-50 dark:bg-gray-700 shadow-sm ${
            removingId === task.id ? "opacity-0 scale-95" : "opacity-100 scale-100 animate-fadeIn"
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch({ type: "TOGGLE_TASK", payload: task.id })}
              className="w-5 h-5 accent-primary"
            />
            {editingId === task.id ? (
              <input
                ref={editRef}
                defaultValue={task.text}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-transform duration-200 transform scale-95 focus:scale-100 dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
              />
            ) : (
              <span
                className={`transition-all duration-300 ease-in-out ${
                  task.completed ? "line-through text-gray-400 dark:text-gray-400 opacity-60" : "opacity-100 text-gray-900 dark:text-gray-100"
                }`}
              >
                {task.text}
              </span>
            )}
          </div>
          <div className="flex gap-3">
            {editingId === task.id ? (
              <button
                onClick={() => handleSave(task)}
                className="text-secondary hover:underline font-medium"
              >
                Save
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleEdit(task)}
                  className="text-primary hover:underline font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-danger hover:underline font-medium"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
