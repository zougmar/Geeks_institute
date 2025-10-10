import React from "react";
import ColumnLeft from "./ColumnLeft";
import ColumnRight from "./ColumnRight";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white text-lg font-semibold p-4 shadow">
        Error Boundaries in React
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <ColumnLeft />
        <ColumnRight />
      </main>
    </div>
  );
}

export default App;
