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
        console.log(`Generated ${filename} in public directory`);
    }
}

const generator = new NetlifyPageGenerator(links);
generator.generateMainPages();

// Copy static files to public directory
const staticFiles = ['style.css', 'script.js', 'all_links.json', 'space_status.json'];
staticFiles.forEach(file => {
    try {
        fs.copyFileSync(file, path.join(publicDir, file));
        console.log(`Copied ${file} to public directory`);
    } catch (error) {
        console.error(`Error copying ${file}:`, error);
    }
});

// Create favicon.ico
const faviconContent = Buffer.from('0000010001002020100001000400E80200001600000028000000200000004000000001000400000000008002000000000000000000000000000000000000000000000000800000800080008080000080000080008000808000007F7F7F00BFBFBF00000000', 'hex');
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), faviconContent);