import express from 'express';
import compression from 'compression';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { checkAllSpaces } from './check-spaces.js';
import { cleanup } from './cleanup.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATUS_FILE = 'space_status.json';
const CACHE_DURATION = 3 * 24 * 60 * 60 * 1000;
const port = 3000;

const app = express();
app.use(compression());

async function getSpaceStatus() {
    try {
        if (!fs.existsSync(STATUS_FILE)) {
            await checkAllSpaces();
            return JSON.parse(fs.readFileSync(STATUS_FILE, 'utf8'));
        }

        const stats = fs.statSync(STATUS_FILE);
        const age = Date.now() - stats.mtimeMs;

        if (age > CACHE_DURATION) {
            await checkAllSpaces();
            return JSON.parse(fs.readFileSync(STATUS_FILE, 'utf8'));
        }

        return JSON.parse(fs.readFileSync(STATUS_FILE, 'utf8'));
    } catch (error) {
        return {};
    }
}

app.get('/space_status.json', async (req, res) => {
    const status = await getSpaceStatus();
    res.json(status);
});

app.use(express.static('.'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

let isShuttingDown = false;

async function handleShutdown() {
    if (isShuttingDown) return;
    isShuttingDown = true;
    
    console.log('\nShutting down server...');
    await cleanup();
    process.exit(0);
}

process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);
process.on('SIGHUP', handleShutdown);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});