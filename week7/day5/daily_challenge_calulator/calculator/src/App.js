import React from "react";
import Calculator from "./Calculator";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex flex-col items-center justify-start p-6">
      <Calculator />
      <div className="w-full max-w-xs mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
          React Calculator
        </h1>
        <p className="text-white text-lg mt-1">By Omar Zouglah</p>
      </div>
    </div>
  );
}

export default App;
