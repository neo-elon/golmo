import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const indexPath = path.join(rootDir, 'index.html');

let html = fs.readFileSync(indexPath, 'utf-8');
// Ensure it points to /src/main.jsx
html = html.replace(/<script type="module"[^>]*>.*?<\/script>/s, '<script type="module" src="/src/main.jsx"></script>');
html = html.replace(/<link rel="stylesheet" crossorigin href="[^"]*">/s, '');
fs.writeFileSync(indexPath, html, 'utf-8');
console.log('Reset index.html entry point to /src/main.jsx for fresh build');
