import React from "react";
import AutoCompletedText from "./AutoCompletedText";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-lg">
          Country Autocomplete Search
        </h1>

        <AutoCompletedText />
      </div>
    </div>
  );
}

export default App;
