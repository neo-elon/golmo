import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// 1. Copy dist/assets to root assets/
const distAssets = path.join(rootDir, 'dist', 'assets');
const rootAssets = path.join(rootDir, 'assets');

if (!fs.existsSync(rootAssets)) {
  fs.mkdirSync(rootAssets, { recursive: true });
}

// Clean old bundles
fs.readdirSync(rootAssets).forEach(file => {
  fs.unlinkSync(path.join(rootAssets, file));
});

fs.readdirSync(distAssets).forEach(file => {
  fs.copyFileSync(path.join(distAssets, file), path.join(rootAssets, file));
  console.log(`Copied ${file} to assets/`);
});

// 2. Copy dist/index.html to root index.html (for GitHub Pages root branch deploy)
const distIndex = path.join(rootDir, 'dist', 'index.html');
const rootIndex = path.join(rootDir, 'index.html');
fs.copyFileSync(distIndex, rootIndex);
console.log('Updated root index.html with production bundle!');

// 3. Copy all dist files to docs/
const docsDir = path.join(rootDir, 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}
fs.cpSync(path.join(rootDir, 'dist'), docsDir, { recursive: true });
console.log('Synchronized docs/ folder for GitHub Pages!');
