import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import Task from "./Task";
import Filter from "./Filter";

const TaskList = () => {
  const { tasks } = useContext(TaskContext);
  const [filter, setFilter] = useState("All");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  return (
    <>
      <Filter filter={filter} setFilter={setFilter} />
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks found.</p>
      ) : (
        <div className="border rounded-md overflow-hidden">
          {filteredTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      )}
    </>
  );
};

export default TaskList;
