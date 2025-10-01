// fileManager.js
const fs = require("fs");

// Function to read file
function readFile(filePath, callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return callback(err, null);
    }
    callback(null, data);
  });
}

// Function to write file
function writeFile(filePath, content, callback) {
  fs.writeFile(filePath, content, "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return callback(err);
    }
    callback(null);
  });
}

// Export functions
module.exports = {
  readFile,
  writeFile,
};
