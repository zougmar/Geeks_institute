import React, { useState } from "react";
import Garage from "./Garage";

const Car = ({ carInfo }) => {
  const [color, setColor] = useState("red");

  // Function to change the car color
  const changeColor = () => {
    // You can pick any colors you like
    const colors = ["blue", "green", "black", "white", "yellow", "orange"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>
        This car is a {color} {carInfo.model}
      </h2>
      <Garage size="small" />

      <button
        onClick={changeColor}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
        }}
      >
        Change Color
      </button>
    </div>
  );
};

export default Car;
