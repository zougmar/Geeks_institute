const fs = require('fs');
const path = require('path');

// File paths
const sourcePath = path.join(__dirname, 'source.txt');
const destPath = path.join(__dirname, 'destination.txt');

// Read the content of source.txt
fs.readFile(sourcePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading source file:', err);
        return;
    }

    // Write the content to destination.txt
    fs.writeFile(destPath, data, (err) => {
        if (err) {
            console.error('Error writing destination file:', err);
            return;
        }
        console.log('File copied successfully to destination.txt');
    });
});
