const express = require("express");
const path = require("path");
const router = express.Router();

// ✅ List of available emojis
const emojis = ["😀", "🎉", "🌟", "🎈", "👋"];

// GET / → Serve form page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

// POST /greet → Show greeting page
router.post("/greet", (req, res) => {
  const { name, emoji } = req.body;

  if (!name) {
    return res.send("<h2 style='color:red;'>⚠️ Name is required!</h2><a href='/'>Go back</a>");
  }

  // Send HTML page with greeting
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Greeting</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
        h1 { color: #333; }
        a { text-decoration: none; color: #4CAF50; }
      </style>
    </head>
    <body>
      <h1>${emoji} Hello, ${name}! ${emoji}</h1>
      <a href="/">Go Back</a>
    </body>
    </html>
  `);
});

module.exports = router;
