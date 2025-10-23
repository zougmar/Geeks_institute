import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleCompletion,
  deleteTask,
  selectTasksByCategory,
  selectAllTasks,
} from "../features/tasks/taskSlice";

const TaskList = ({ categoryId }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) =>
    categoryId ? selectTasksByCategory(state, categoryId) : selectAllTasks(state)
  );

  const handleToggle = useCallback(
    (id) => dispatch(toggleCompletion(id)),
    [dispatch]
  );

  const handleDelete = useCallback(
    (id) => dispatch(deleteTask(id)),
    [dispatch]
  );

  return (
    <div className="mt-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-2"
        >
          <div>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task.id)}
              className="mr-2"
            />
            <span className={task.completed ? "line-through text-gray-500" : ""}>
              {task.title}
            </span>
          </div>
          <button
            onClick={() => handleDelete(task.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
