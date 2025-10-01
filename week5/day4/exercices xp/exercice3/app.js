// app.js
const { readFile, writeFile } = require("./fileManager");

// Step 1: Read content of "Hello World.txt"
readFile("Hello World.txt", (err, data) => {
  if (err) return;
  console.log("Content of Hello World.txt:", data);

  // Step 2: Write new content into "Bye World.txt"
  writeFile("Bye World.txt", "Writing to the file", (err) => {
    if (err) return;
    console.log("Successfully wrote to Bye World.txt!");

    // Step 3: Read "Bye World.txt" to verify
    readFile("Bye World.txt", (err, newData) => {
      if (err) return;
      console.log("Updated content of Bye World.txt:", newData);
    });
  });
});
