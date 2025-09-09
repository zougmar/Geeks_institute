// Array of planet objects
const planets = [
    { name: "Mercury", color: "gray", moons: 0 },
    { name: "Venus", color: "yellow", moons: 0 },
    { name: "Earth", color: "blue", moons: 1 },
    { name: "Mars", color: "red", moons: 2 },
    { name: "Jupiter", color: "orange", moons: 79 },
    { name: "Saturn", color: "goldenrod", moons: 82 },
    { name: "Uranus", color: "lightblue", moons: 27 },
    { name: "Neptune", color: "darkblue", moons: 14 }
];

// Select the section from HTML
const section = document.querySelector(".listPlanets");

// Loop through each planet
planets.forEach(planet => {
    // Create planet div
    const planetDiv = document.createElement("div");
    planetDiv.classList.add("planet");
    planetDiv.style.backgroundColor = planet.color;
    planetDiv.textContent = planet.name;

    // Add moons if there are any
    for (let i = 0; i < planet.moons; i++) {
        const moonDiv = document.createElement("div");
        moonDiv.classList.add("moon");

        // Random position around planet
        const angle = (i / planet.moons) * 2 * Math.PI; // evenly distributed
        const radius = 60 + Math.random() * 40; // distance from planet
        moonDiv.style.left = `${50 + radius * Math.cos(angle)}px`;
        moonDiv.style.top = `${50 + radius * Math.sin(angle)}px`;

        planetDiv.appendChild(moonDiv);
    }

    // Append planet to section
    section.appendChild(planetDiv);
});
