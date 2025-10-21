import React from "react";
import DatePicker from "./DatePicker";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-blue-600">📅 Daily Planner</h1>
          <p className="text-gray-500 text-sm">Organize your day efficiently</p>
        </header>

        <section className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <DatePicker />
          <TaskForm />
        </section>

        <TaskList />
      </div>
    </div>
  );
}
