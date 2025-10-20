import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskFilter = () => {
  const { state, dispatch } = useContext(TaskContext);

  const buttons = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
  ];

  return (
    <div className="flex gap-3 mt-5 justify-center">
      {buttons.map(btn => (
        <button
          key={btn.value}
          onClick={() => dispatch({ type: "FILTER_TASKS", payload: btn.value })}
          className={`px-5 py-2 rounded-lg border transition-all duration-200 font-medium ${
            state.filter === btn.value
              ? "bg-primary text-white border-primary shadow"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-primary hover:text-white"
          }`}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
