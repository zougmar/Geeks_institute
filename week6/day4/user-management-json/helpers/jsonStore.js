// helpers/jsonStore.js
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(new URL('../data/users.json', import.meta.url).pathname);

export async function readJson() {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    // If file doesn't exist or corrupted, throw to let caller handle
    throw new Error('Failed to read data file: ' + err.message);
  }
}

export async function writeJson(data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    throw new Error('Failed to write data file: ' + err.message);
  }
}
