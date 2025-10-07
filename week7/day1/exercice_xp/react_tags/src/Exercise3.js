import React, { Component } from "react";
import "./Exercise.css";

class Exercise extends Component {
  render() {
    const style_header = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial",
    };

    return (
      <div style={{ textAlign: "center", margin: "30px" }}>
        <h1 style={style_header}>This is a Header</h1>

        <p className="para">This is a Paragraph</p>

        <a
          href="https://react.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          This is a Link
        </a>

        <h3 style={{ marginTop: "40px" }}>This is a Form:</h3>
        <form>
          <label>
            Enter your name:{" "}
            <input type="text" placeholder="Name" />
          </label>
          <button type="submit">Submit</button>
        </form>

        <h3 style={{ marginTop: "40px" }}>Here is an Image:</h3>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          alt="React Logo"
          width="300"
        />

        <h3 style={{ marginTop: "40px" }}>This is a List:</h3>
        <ul style={{ listStyleType: "disc", display: "inline-block", textAlign: "left" }}>
          <li>Coffee</li>
          <li>Tea</li>
          <li>Milk</li>
        </ul>
      </div>
    );
  }
}

export default Exercise;
