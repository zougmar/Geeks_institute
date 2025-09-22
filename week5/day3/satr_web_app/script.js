const nameEl = document.getElementById("name");
const heightEl = document.getElementById("height");
const genderEl = document.getElementById("gender");
const birthEl = document.getElementById("birth");
const homeEl = document.getElementById("home");
const messageEl = document.getElementById("message");
const button = document.getElementById("findBtn");

async function fetchCharacter(id) {
  try {
    messageEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    
    const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const character = data.result.properties;

    // fetch homeworld
    const homeResponse = await fetch(character.homeworld);
    const homeData = await homeResponse.json();

    displayCharacter(character, homeData.result.properties.name);
  } catch (error) {
    messageEl.innerHTML = `<span style="color:red;">⚠ Error loading data</span>`;
    console.error("Error:", error);
  }
}

function displayCharacter(character, homeworld) {
  nameEl.textContent = character.name;
  heightEl.textContent = `Height: ${character.height}`;
  genderEl.textContent = `Gender: ${character.gender}`;
  birthEl.textContent = `Birth Year: ${character.birth_year}`;
  homeEl.textContent = `Home World: ${homeworld}`;
  messageEl.textContent = ""; // clear loading/error message
}

button.addEventListener("click", () => {
  const randomId = Math.floor(Math.random() * 83) + 1; // API has 83 characters
  fetchCharacter(randomId);
});
