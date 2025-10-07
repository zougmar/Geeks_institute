import React, { useState } from "react";

const Events = () => {
  // 🔹 Part I: Click Event
  const clickMe = () => {
    alert("I was clicked");
  };

  // 🔹 Part II: KeyDown Event
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      alert(`You pressed Enter! Input value: ${event.target.value}`);
    }
  };

  // 🔹 Part III: Toggle Button (State)
  const [isToggleOn, setIsToggleOn] = useState(true);

  const toggle = () => {
    setIsToggleOn(!isToggleOn);
  };

  // 🔹 Return JSX
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* Part I */}
      <h2>Part I: Click Event</h2>
      <button onClick={clickMe}>Click Me</button>

      <hr />

      {/* Part II */}
      <h2>Part II: KeyDown Event</h2>
      <input
        type="text"
        placeholder="Type something and press Enter"
        onKeyDown={handleKeyDown}
        style={{ padding: "8px", width: "250px" }}
      />

      <hr />

      {/* Part III */}
      <h2>Part III: Toggle Button</h2>
      <button
        onClick={toggle}
        style={{
          backgroundColor: isToggleOn ? "green" : "red",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {isToggleOn ? "ON" : "OFF"}
      </button>
    </div>
  );
};

export default Events;
