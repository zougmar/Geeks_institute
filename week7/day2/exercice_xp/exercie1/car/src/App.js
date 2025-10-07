import React from "react";
import Car from "./Components/Car";

function App() {
  const carInfo = { name: "Ford", model: "Mustang" };

  return (
    <div className="App">
      <Car carInfo={carInfo} />
    </div>
  );
}

export default App;
