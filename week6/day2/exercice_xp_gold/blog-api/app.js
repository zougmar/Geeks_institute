const express = require("express");
const postRoutes = require("./routes/posts");

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());

// Routes
app.use("/posts", postRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
