import React, { useState } from "react";
import ErrorBoundary from "./ErrorBoundary";

function ColumnRight() {
  const [text, setText] = useState('{"function": "I live to crash"}');

  const replaceWithObject = () => {
    // This will cause a render error
    setText({ function: "I live to crash" });
  };

  const handleEventError = () => {
    // This error appears only in console
    throw new Error("Error thrown inside event handler!");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-3 text-gray-800">Right column</h2>
      <p className="text-gray-700 mb-4">
        There are two types of errors we can trigger inside this component:
        <br />
        A <strong>rendering error</strong> and a <strong>regular JavaScript error</strong>.
      </p>

      <ErrorBoundary>
        <p className="text-gray-700 mb-6">
          Clicking this button will replace the stringified object:{" "}
          <code className="bg-gray-100 p-1 rounded text-pink-600">{text}</code>{" "}
          with the original object. This will cause a rendering error.
        </p>
      </ErrorBoundary>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={replaceWithObject}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Replace string with object
        </button>

        <button
          onClick={handleEventError}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Invoke event handler
        </button>
      </div>
    </div>
  );
}

export default ColumnRight;
