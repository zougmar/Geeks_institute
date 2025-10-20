// src/components/Filter.js
import React from "react";

const Filter = ({ filter, setFilter }) => {
  return (
    <div className="flex justify-center gap-2 mb-4">
      {["All", "Completed", "Pending"].map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-4 py-1 rounded ${
            filter === f ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default Filter;
