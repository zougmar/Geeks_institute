import React, { useState } from "react";

function App() {
  const [languages, setLanguages] = useState([
    { name: "Php", votes: 0 },
    { name: "Python", votes: 0 },
    { name: "JavaScript", votes: 0 },
    { name: "Java", votes: 0 },
  ]);

  const handleVote = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index].votes += 1;
    setLanguages(updatedLanguages);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1><b>Vote Your Language!</b></h1>
      {languages.map((language, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#FFEFD5",
            margin: "10px auto",
            padding: "15px",
            width: "300px",
            border: "1px solid #000",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{language.votes}</span>
          <span>{language.name}</span>
          <button
            onClick={() => handleVote(index)}
            style={{
              background: "none",
              color: "green",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Click Here
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
