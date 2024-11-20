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
        for (let i = 1; i <= this.totalPages; i++) {
            const startIdx = (i - 1) * this.itemsPerPage;
            const pageLinks = this.links.slice(startIdx, startIdx + this.itemsPerPage);
            
            const linksHtml = pageLinks.map(getLinkItem).join('');
            const paginationHtml = getPaginationLinks(i, this.totalPages);
            
            const content = linksHtml + paginationHtml;
            const html = getPageTemplate(`AI Tools Directory - Page ${i}`, content, i);

            const filename = i === 1 ? 'index.html' : `page${i}.html`;
            this.writeFile(filename, html);
        }

        const searchContent = `<div id="search-results"></div><div class="search-instructions"><p>Start typing to search through ${this.links.length} AI tools</p></div>`;
        const searchHtml = getPageTemplate('Search AI Tools', searchContent, 'search');
        this.writeFile('search.html', searchHtml);
    }

    writeFile(filename, content) {
        fs.writeFileSync(filename, content, 'utf8');
        this.generatedFiles.push(filename);
    }

    cleanup() {
        this.generatedFiles.forEach(file => {
            try {
                fs.unlinkSync(file);
            } catch (err) {
                process.exitCode = 1;
            }
        });
    }
}
