import React from "react";
import { TaskProvider } from "./context/TaskContext";
import AddTask from "./Components/AddTask";
import TaskList from "./Components/TaskList";

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Task Manager</h1>
          <AddTask />
          <TaskList />
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
