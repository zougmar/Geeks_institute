import React, { useState } from "react";

const Phone = () => {
  const [phone, setPhone] = useState({
    brand: "Samsung",
    model: "Galaxy S20",
    color: "black",
    year: 2020,
  });

  const changeColor = () => {
    setPhone((prevState) => ({
      ...prevState,
      color: "blue",
      year: 2021,
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-80 text-center border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          📱 My Phone
        </h2>
        <div className="text-left mb-6">
          <p className="text-gray-700">
            <span className="font-medium">Brand:</span> {phone.brand}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Model:</span> {phone.model}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Color:</span>{" "}
            <span
              className={`px-2 py-1 rounded text-white ${
                phone.color === "blue" ? "bg-blue-500" : "bg-gray-800"
              }`}
            >
              {phone.color}
            </span>
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Year:</span> {phone.year}
          </p>
        </div>
        <button
          onClick={changeColor}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Change Color
        </button>
      </div>
    </div>
  );
};

export default Phone;
