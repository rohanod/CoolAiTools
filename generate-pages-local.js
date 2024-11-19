import fs from 'fs';
import { PageGenerator } from './src/generator.js';

const links = JSON.parse(fs.readFileSync('all_links.json', 'utf8'));
const generator = new PageGenerator(links);

generator.generateMainPages();