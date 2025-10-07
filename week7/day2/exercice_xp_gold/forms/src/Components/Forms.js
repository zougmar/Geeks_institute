import React, { useState } from "react";

const Forms = () => {
  // Part I & IV: State variables
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("This is some initial content");
  const [selectedCar, setSelectedCar] = useState("Volvo");

  // Part III: Form submit handler
  const mySubmitHandler = (e) => {
    e.preventDefault(); // prevent page reload
    if (age && isNaN(age)) {
      alert("Age must be numeric!");
      return;
    }
    alert(`Username: ${username}, Age: ${age}`);
  };

  // Part II: Conditional rendering
  let header = null;
  if (username || age) {
    header = (
      <h2>
        {username ? `Name: ${username}` : ""}{" "}
        {age ? `Age: ${age}` : ""}
      </h2>
    );
  }

  // Input change handlers
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleAgeChange = (e) => {
    const value = e.target.value;
    setAge(value);
    if (value && isNaN(value)) {
      setErrorMessage("Age must be numeric!");
    } else {
      setErrorMessage("");
    }
  };

  const handleTextareaChange = (e) => setMessage(e.target.value);
  const handleCarChange = (e) => setSelectedCar(e.target.value);

  return (
    <div style={{ padding: "20px" }}>
      {/* Part II */}
      {header}

      {/* Part I, III, IV, V */}
      <form onSubmit={mySubmitHandler}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Name:{" "}
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Age:{" "}
            <input
              type="text"
              name="age"
              value={age}
              onChange={handleAgeChange}
            />
          </label>
          {errormessage && <div style={{ color: "red" }}>{errormessage}</div>}
        </div>

        <button type="submit">Submit</button>
      </form>

      {/* Part VI: Textarea */}
      <div style={{ marginTop: "20px" }}>
        <label>
          Message:
          <textarea
            value={message}
            onChange={handleTextareaChange}
            rows={4}
            cols={50}
          />
        </label>
        <p>Preview: {message}</p>
      </div>

      {/* Part VII: Select */}
      <div style={{ marginTop: "20px" }}>
        <label>
          Choose a car:
          <select value={selectedCar} onChange={handleCarChange}>
            <option value="Volvo">Volvo</option>
            <option value="Saab">Saab</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Audi">Audi</option>
          </select>
        </label>
        <p>Selected car: {selectedCar}</p>
      </div>
    </div>
  );
};

export default Forms;
