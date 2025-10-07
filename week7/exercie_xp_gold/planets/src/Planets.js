import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Planets = () => {
  const planets = ['Mars', 'Venus', 'Jupiter', 'Earth', 'Saturn', 'Neptune'];

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Planets of the Solar System</h3>
      <ul className="list-group">
        {planets.map((planet, index) => (
          <li key={index} className="list-group-item">
            {planet}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Planets;
