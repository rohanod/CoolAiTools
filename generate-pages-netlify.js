import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PageGenerator } from './src/generator.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, 'public');
fs.mkdirSync(publicDir, { recursive: true });

const links = JSON.parse(fs.readFileSync('all_links.json', 'utf8'));

class NetlifyPageGenerator extends PageGenerator {
    writeFile(filename, content) {
        const filepath = path.join(publicDir, filename);
        fs.mkdirSync(path.dirname(filepath), { recursive: true });
        fs.writeFileSync(filepath, content, 'utf8');
    }
}

const generator = new NetlifyPageGenerator(links);
generator.generateMainPages();

[
    'style.css',
    'script.js',
    'all_links.json',
    'space_status.json',
    'favicon.ico',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'android-chrome-192x192.png',
    'android-chrome-512x512.png',
    'apple-touch-icon.png',
    'site.webmanifest'
].forEach(file => fs.existsSync(file) && fs.copyFileSync(file, path.join(publicDir, file)));
