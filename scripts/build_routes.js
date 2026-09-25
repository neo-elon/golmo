import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

function extractCoords(rawFile) {
  let content = fs.readFileSync(path.join(rootDir, 'scripts', rawFile), 'utf-8');
  content = content.replace(/^\uFEFF/, '');
  const parsed = JSON.parse(content);
  return parsed.map(item => item.value ? item.value : item);
}

const seochonCoords = extractCoords('seochon_path.json');
const cheongnaCoords = extractCoords('cheongna_path.json');

console.log(`Extracted Seochon: ${seochonCoords.length} pts, Cheongna: ${cheongnaCoords.length} pts`);

// Save clean coordinates JSON
fs.writeFileSync(path.join(rootDir, 'src', 'data', 'seochonRoute.json'), JSON.stringify(seochonCoords), 'utf-8');
fs.writeFileSync(path.join(rootDir, 'src', 'data', 'cheongnaRoute.json'), JSON.stringify(cheongnaCoords), 'utf-8');
console.log('Saved clean route JSONs in src/data/');
