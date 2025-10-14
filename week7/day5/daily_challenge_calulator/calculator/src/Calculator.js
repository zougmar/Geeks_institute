import React, { useState, useEffect, useCallback } from "react";
import { evaluate } from "mathjs";

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [history, setHistory] = useState([]);

  const handleClick = (value) => setDisplay((prev) => prev + value);
  const handleClear = () => setDisplay("");

  const handleCalculate = useCallback(() => {
    try {
      const result = evaluate(display);
      setHistory((prev) => [...prev, `${display} = ${result}`]);
      setDisplay(result.toString());
    } catch {
      setDisplay("Error");
    }
  }, [display]);

  const handleKeyPress = useCallback(
    (event) => {
      const allowedKeys = "0123456789+-*/().";
      if (allowedKeys.includes(event.key)) {
        setDisplay((prev) => prev + event.key);
      } else if (event.key === "Enter") {
        handleCalculate();
      } else if (event.key === "Backspace") {
        setDisplay((prev) => prev.slice(0, -1));
      }
    },
    [handleCalculate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+"
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 rounded-3xl shadow-2xl w-full max-w-xs ring-4 ring-blue-500">
      
      <div className="mb-6">
        <input
          type="text"
          value={display}
          readOnly
          className="w-full p-4 text-right text-4xl font-mono bg-gray-900 text-green-400 rounded-2xl shadow-inner ring-2 ring-green-500"
        />
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4">
        {buttons.map((btn) => {
          const isOperator = ["+", "-", "*", "/"].includes(btn);
          const isEqual = btn === "=";

          return (
            <button
              key={btn}
              onClick={isEqual ? handleCalculate : () => handleClick(btn)}
              className={`py-4 rounded-full text-xl font-bold transform transition-all active:scale-95 shadow-lg ${
                isEqual
                  ? "bg-gradient-to-tr from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 ring-2 ring-blue-300"
                  : isOperator
                  ? "bg-gradient-to-tr from-orange-500 to-orange-700 text-white hover:from-orange-600 hover:to-orange-800 ring-2 ring-orange-300"
                  : "bg-gray-800 text-green-400 hover:bg-gray-700 ring-2 ring-green-500"
              }`}
            >
              {btn}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleClear}
        className="w-full py-4 rounded-full text-xl font-bold bg-red-600 text-white hover:bg-red-700 active:scale-95 shadow-lg ring-2 ring-red-400 mb-4 transition-all"
      >
        Clear
      </button>

      {history.length > 0 && (
        <div className="bg-gray-800 p-4 rounded-2xl max-h-40 overflow-y-auto text-green-400 font-mono ring-2 ring-green-500">
          <h2 className="text-lg font-semibold mb-2">History</h2>
          <ul className="text-sm space-y-1">
            {history.slice(-5).reverse().map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Calculator;
