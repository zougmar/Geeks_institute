// server.js
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory data (simulated DB)
let posts = [
  { id: 1, title: "First Post", content: "This is the first blog post" },
  { id: 2, title: "Second Post", content: "This is another blog post" },
];

// ================= Routes =================

// GET /posts - Get all blog posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// GET /posts/:id - Get single post by ID
app.get("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json(post);
});

// POST /posts - Create a new post
app.post("/posts", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const newPost = {
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    title,
    content,
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// PUT /posts/:id - Update a post
app.put("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, content } = req.body;

  const postIndex = posts.findIndex((p) => p.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({ error: "Post not found" });
  }

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  posts[postIndex] = { id: postId, title, content };

  res.json(posts[postIndex]);
});

// DELETE /posts/:id - Delete a post
app.delete("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex((p) => p.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({ error: "Post not found" });
  }

  const deletedPost = posts.splice(postIndex, 1);
  res.json({ message: "Post deleted", post: deletedPost[0] });
});

// ================= Error Handling =================

// Handle invalid routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Handle server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// ================= Start Server =================
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
