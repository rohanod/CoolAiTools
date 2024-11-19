import fs from 'fs';
import path from 'path';
import { getPageTemplate, getLinkItem, getPaginationLinks } from './templates.js';

export class PageGenerator {
    constructor(links, itemsPerPage = 15) {
        this.links = links;
        this.itemsPerPage = itemsPerPage;
        this.totalPages = Math.ceil(links.length / itemsPerPage);
        this.generatedFiles = [];
    }

    generateMainPages() {
        // Generate main pages
        for (let i = 1; i <= this.totalPages; i++) {
            const startIdx = (i - 1) * this.itemsPerPage;
            const pageLinks = this.links.slice(startIdx, startIdx + this.itemsPerPage);
            
            const linksHtml = pageLinks.map(getLinkItem).join('\n');
            const paginationHtml = getPaginationLinks(i, this.totalPages);
            
            const content = linksHtml + '\n' + paginationHtml;
            const html = getPageTemplate(`AI Tools Directory - Page ${i}`, content, i);

            const filename = i === 1 ? 'index.html' : `page${i}.html`;
            this.writeFile(filename, html);
        }

        // Generate search page
        const searchContent = `
<div id="search-results"></div>
<div class="search-instructions">
    <p>Start typing to search through ${this.links.length} AI tools</p>
</div>`;
        const searchHtml = getPageTemplate('Search AI Tools', searchContent, 'search');
        this.writeFile('search.html', searchHtml);
    }

    writeFile(filename, content) {
        fs.writeFileSync(filename, content);
        this.generatedFiles.push(filename);
        console.log(`Generated ${filename}`);
    }

    cleanup() {
        this.generatedFiles.forEach(file => {
            try {
                fs.unlinkSync(file);
                console.log(`Removed ${file}`);
            } catch (err) {
                // Ignore errors during cleanup
            }
        });
    }
}