
const url = "https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

// Fetch data
fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); 
  })
  .then((data) => {
    console.log("✅ Giphy Data:", data);
    console.log("🔹 First GIF URL:", data.data[0].url); 
  })
  .catch((error) => {
    console.error("❌ Fetch error:", error);
  });
  