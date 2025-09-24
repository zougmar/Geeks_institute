

const fs = require('fs');

function readFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data;
    } catch (err) {
        console.error(`Error reading file from disk: ${err}`);
    }
}

function writeFile(filePath, content) {
    try {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('File written successfully');
    } catch (err) {
        console.error(`Error writing file to disk: ${err}`);
    }
}   
module.exports = { readFile, writeFile };