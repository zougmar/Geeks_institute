import React from "react";

export default function DatePicker({ selectedDate, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <label className="font-semibold text-gray-700">Select Date:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  );
}
