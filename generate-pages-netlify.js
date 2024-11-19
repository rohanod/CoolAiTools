import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PageGenerator } from './src/generator.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const links = JSON.parse(fs.readFileSync('all_links.json', 'utf8'));

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

class NetlifyPageGenerator extends PageGenerator {
    writeFile(filename, content) {
        const filepath = path.join(publicDir, filename);
        fs.writeFileSync(filepath, content);
    }
}

const generator = new NetlifyPageGenerator(links);
generator.generateMainPages();

const staticFiles = ['style.css', 'script.js', 'all_links.json', 'space_status.json', 'favicon.ico', 'favicon-16x16.png', 'favicon-32x32.png', 'android-chrome-192x192.png', 'android-chrome-512x512.png', 'apple-touch-icon.png', 'site.webmanifest'];

staticFiles.forEach(file => {
    if (fs.existsSync(file)) {
        fs.copyFileSync(file, path.join(publicDir, file));
    }
});
