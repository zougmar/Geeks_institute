const express = require("express");
const app = express();
const PORT = 4000;

// Middleware to parse JSON
app.use(express.json());

//import routes
const bookRoutes = require("./routes/books");

// Use routes
app.use("/books", bookRoutes);

app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });