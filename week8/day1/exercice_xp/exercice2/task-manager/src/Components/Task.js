import React, { useContext, useState } from "react";
import { TaskContext, ACTIONS } from "../context/TaskContext";

const Task = ({ task }) => {
  const { dispatch } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    if (editText.trim() === "") return;
    dispatch({ type: ACTIONS.EDIT_TASK, payload: { id: task.id, text: editText } });
    setIsEditing(false);
  };

  return (
    <div
      className={`flex justify-between items-center p-2 border-b ${
        task.completed ? "bg-green-100 line-through" : "bg-white"
      }`}
    >
      {isEditing ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={(e) => e.key === "Enter" && handleEdit()}
          autoFocus
          className="border rounded px-2 py-1 flex-1"
        />
      ) : (
        <span>{task.text}</span>
      )}

      <div className="flex gap-2">
        <button
          onClick={() =>
            dispatch({ type: ACTIONS.TOGGLE_TASK, payload: { id: task.id } })
          }
          className="text-green-500 hover:underline"
        >
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-500 hover:underline"
        >
          Edit
        </button>

        <button
          onClick={() =>
            dispatch({ type: ACTIONS.REMOVE_TASK, payload: { id: task.id } })
          }
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
