// app.js
import express from "express";  // Use import since we will treat this as an ES module
import { fetchPosts } from "./data/dataService.js"; // Import the data module

const app = express();
const port = 5001;

// Middleware to parse JSON
app.use(express.json());

// Route to get all posts
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await fetchPosts();
    console.log("Data successfully retrieved!")
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
