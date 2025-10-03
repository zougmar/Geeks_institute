const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const greetRouter = require("./routes/greet");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/", greetRouter);

// Static files (CSS, JS, images if needed)
app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
