import { readFile } from 'fs/promises';

async function readData() {
    try {
        const data = await readFile('file-data.txt', 'utf8');
        console.log(data);
    } catch (err) {
        console.error('Error reading the file:', err);
    }
}


readData();