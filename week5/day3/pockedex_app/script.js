const pokemonImage = document.getElementById("pokemonImage");
const pokemonName = document.getElementById("pokemonName");
const pokemonId = document.getElementById("pokemonId");
const pokemonHeight = document.getElementById("pokemonHeight");
const pokemonWeight = document.getElementById("pokemonWeight");
const pokemonType = document.getElementById("pokemonType");

const randomBtn = document.getElementById("randomBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentPokemonId = 25; // start with Pikachu

async function fetchPokemon(id) {
  try {
    pokemonName.textContent = "Loading...";
    pokemonImage.src = "";
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) throw new Error("Not found!");
    const data = await response.json();

    pokemonImage.src = data.sprites.front_default;
    pokemonName.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    pokemonId.textContent = `Pokemon n° ${data.id}`;
    pokemonHeight.textContent = `Height: ${data.height}`;
    pokemonWeight.textContent = `Weight: ${data.weight}`;
    pokemonType.textContent = `Type: ${data.types.map(t => t.type.name).join(", ")}`;

    currentPokemonId = data.id;
  } catch (error) {
    pokemonName.textContent = "Oh no! That Pokemon isn’t available…";
    pokemonImage.src = "";
  }
}

// Buttons
randomBtn.addEventListener("click", () => {
  let randomId = Math.floor(Math.random() * 898) + 1;
  fetchPokemon(randomId);
});

nextBtn.addEventListener("click", () => fetchPokemon(currentPokemonId + 1));
prevBtn.addEventListener("click", () => {
  if (currentPokemonId > 1) fetchPokemon(currentPokemonId - 1);
});

// Load default
fetchPokemon(currentPokemonId);
