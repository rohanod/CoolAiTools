import fs from 'fs';
import fetch from 'node-fetch';
import AbortController from 'abort-controller';

const STATUS_FILE = 'space_status.json';
const LINKS_FILE = 'all_links.json';

async function checkSpaceStatus(url) {
    if (!url.includes('hf.space')) return { status: "is-working", remove: false };
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(url, { signal: controller.signal });
        const text = await response.text();
        clearTimeout(timeoutId);

        const isError = text.includes('Your space is in error, check its status on hf.co');
        const is404 = text.includes('404') && text.includes("Sorry, we can't find the page you are looking for.");

        if (is404 || response.status === 404) {
            return { status: "404", remove: true };
        }

        if (isError) {
            return { status: "non-working", remove: false };
        }

        return { status: "is-working", remove: false };
    } catch (error) {
        if (error.name === 'AbortError' || error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
            return { status: "404", remove: true };
        }
        return { status: "non-working", remove: false };
    }
}

export async function checkAllSpaces() {
    const links = JSON.parse(fs.readFileSync(LINKS_FILE, 'utf8'));
    let statusData = {};
    
    if (fs.existsSync(STATUS_FILE)) {
        statusData = JSON.parse(fs.readFileSync(STATUS_FILE, 'utf8'));
    }

    const batchSize = 5;
    let updatedLinks = [];
    let removedCount = 0;
    let errorCount = 0;
    let workingCount = 0;
    let removedSpaces = [];
    let errorSpaces = [];
    let workingSpaces = [];

    updatedLinks = links.filter(link => !link.url.includes('hf.space'));
    const nonSpaceCount = updatedLinks.length;
    const spaceLinks = links.filter(link => link.url.includes('hf.space'));
    
    console.log('Starting space status check...\n');
    console.log('Initial counts:');
    console.log(`- Total links: ${links.length}`);
    console.log(`- Non-space links: ${nonSpaceCount}`);
    console.log(`- Space links: ${spaceLinks.length}\n`);
    console.log(`Checking ${spaceLinks.length} space links...\n`);

    for (let i = 0; i < spaceLinks.length; i += batchSize) {
        const batch = spaceLinks.slice(i, i + batchSize);
        const results = await Promise.all(batch.map(async link => {
            const { status, remove } = await checkSpaceStatus(link.url);
            return { link, status, remove };
        }));

        for (const { link, status, remove } of results) {
            statusData[link.url] = {
                status,
                timestamp: Date.now()
            };

            if (remove) {
                removedCount++;
                removedSpaces.push(link.url);
            } else {
                if (status !== "is-working") {
                    errorCount++;
                    errorSpaces.push(link.url);
                } else {
                    workingCount++;
                    workingSpaces.push(link.url);
                }
                updatedLinks.push(link);
            }
        }

        fs.writeFileSync(STATUS_FILE, JSON.stringify(statusData, null, 2));
        fs.writeFileSync(LINKS_FILE, JSON.stringify(updatedLinks, null, 2));

        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\nCheck completed:\n');
    console.log(`Working Spaces (${workingCount}):`);
    workingSpaces.forEach(url => console.log(`✅ ${url}`));
    
    console.log(`\nError State Spaces (${errorCount}):`);
    errorSpaces.forEach(url => console.log(`⚠️  ${url}`));
    
    console.log(`\nRemoved Spaces (${removedCount}):`);
    removedSpaces.forEach(url => console.log(`❌ ${url}`));
    
    console.log(`\nFinal Summary:`);
    console.log(`- Initial total links: ${links.length}`);
    console.log(`- Non-space links: ${nonSpaceCount}`);
    console.log(`- Working spaces: ${workingCount}`);
    console.log(`- Error state spaces: ${errorCount}`);
    console.log(`- Removed spaces: ${removedCount}`);
    console.log(`- Total links remaining: ${updatedLinks.length}`);
}
