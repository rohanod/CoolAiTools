import fs from 'fs';
import { PageGenerator } from './src/generator.js';

const links = JSON.parse(fs.readFileSync('all_links.json', 'utf8'));

class LocalPageGenerator extends PageGenerator {
    writeFile(filename, content) {
        fs.writeFileSync(filename, content, 'utf8');
    }
}

const generator = new LocalPageGenerator(links);
generator.generateMainPages();
