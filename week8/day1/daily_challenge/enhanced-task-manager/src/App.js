import React, { useState } from "react";
import { TaskProvider } from "./context/TaskContext";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <TaskProvider>
      <div className={darkMode ? "dark min-h-screen bg-gray-900 flex justify-center p-6" : "min-h-screen bg-gray-100 flex justify-center p-6"}>
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl transition-colors duration-300">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              Task Manager
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? "Light" : "Dark"}
            </button>
          </div>
          <TaskInput />
          <TaskList />
          <TaskFilter />
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
