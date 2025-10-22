import React, { useState } from "react";
import DatePicker from "./components/DatePicker";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

export default function App() {
  const today = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(today);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          🗓️ Daily Planner
        </h1>

        <div className="flex justify-center mb-6">
          <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} />
        </div>

        <AddTask selectedDate={selectedDate} />

        <div className="mt-8">
          <TaskList selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
}