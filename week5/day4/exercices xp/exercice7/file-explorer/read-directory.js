const fs = require('fs');
const path = require('path');

// Directory to read
const dirPath = __dirname;

fs.readdir(dirPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    console.log('Files in directory:');
    files.forEach(file => {
        console.log(file);
    });
});
