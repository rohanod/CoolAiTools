import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PageGenerator } from './src/generator.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, 'public');

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

const links = JSON.parse(fs.readFileSync('all_links.json', 'utf8'));

class NetlifyPageGenerator extends PageGenerator {
    writeFile(filename, content) {
        const filepath = path.join(publicDir, filename);
        const dir = path.dirname(filepath);
        
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        fs.writeFileSync(filepath, content, 'utf8');
    }
}

const generator = new NetlifyPageGenerator(links);
generator.generateMainPages();

const staticFiles = [
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
];

for (const file of staticFiles) {
    if (fs.existsSync(file)) {
        fs.copyFileSync(file, path.join(publicDir, file));
    }
}

process.on('uncaughtException', (error) => {
    console.error(error);
    process.exit(1);
});
