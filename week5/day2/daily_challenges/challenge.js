const apiKey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const form = document.getElementById("gifForm");
const input = document.getElementById("categoryInput");
const gifContainer = document.getElementById("gifContainer");
const deleteAllBtn = document.getElementById("deleteAllBtn");

// Fetch a random GIF based on user category
async function fetchRandomGif(category) {
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${category}&rating=g`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.images.fixed_height.url; // URL of GIF
  } catch (error) {
    console.error("Error fetching GIF:", error);
    alert("Failed to fetch GIF. Try again!");
  }
}

// Append GIF to the page
function appendGif(url) {
  const gifItem = document.createElement("div");
  gifItem.className = "gif-item";

  const img = document.createElement("img");
  img.src = url;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "DELETE";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", () => {
    gifContainer.removeChild(gifItem);
  });

  gifItem.appendChild(img);
  gifItem.appendChild(deleteBtn);
  gifContainer.appendChild(gifItem);
}

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const category = input.value.trim();
  if (!category) return;

  const gifUrl = await fetchRandomGif(category);
  if (gifUrl) {
    appendGif(gifUrl);
  }

  input.value = "";
});

// Delete all GIFs
deleteAllBtn.addEventListener("click", () => {
  gifContainer.innerHTML = "";
});
