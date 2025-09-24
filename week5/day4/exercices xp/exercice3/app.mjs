
const { readFile, writeFile } = require("./fileManager.mjs");


const helloContent = readFile("Hello World.txt");
console.log("📖 Content of Hello World.txt:", helloContent);

writeFile("Bye World.txt", "Writing to the file");


const byeContent = readFile("Bye World.txt");
console.log("📖 New content of Bye World.txt:", byeContent);
