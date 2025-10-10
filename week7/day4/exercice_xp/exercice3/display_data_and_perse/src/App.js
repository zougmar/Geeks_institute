import React from "react";
import Example1 from "./componetns/exemple1";
import Example2 from "./componetns/exemple2";
import Example3 from "./componetns/exemple3";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 underline">
        Display Complex JSON Data 
      </h1>
      <div className="max-w-3xl w-full space-y-6">
        <Example1 />
        <Example2 />
        <Example3 />
      </div>
    </div>
  );
}

export default App;
