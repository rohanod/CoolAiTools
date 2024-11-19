import fs from 'fs';
import { promisify } from 'util';

const unlinkAsync = promisify(fs.unlink);
const rmdirAsync = promisify(fs.rm);
const existsAsync = promisify(fs.exists);

const filesToRemove = [
    'index.html',
    'page2.html',
    'page3.html',
    'page4.html',
    'page5.html',
    'search.html',
    'space_status.json'
];

const dirsToRemove = [
    'dist',
    'public'
];

export async function cleanup() {
    let cleanupSuccessful = true;

    await Promise.all(filesToRemove.map(async (file) => {
        try {
            if (await existsAsync(file)) {
                await unlinkAsync(file);
                console.log(`Cleaned up: ${file}`);
            }
        } catch (error) {
            cleanupSuccessful = false;
            console.error(`Failed to clean up ${file}`);
        }
    }));

    await Promise.all(dirsToRemove.map(async (dir) => {
        try {
            if (await existsAsync(dir)) {
                await rmdirAsync(dir, { recursive: true, force: true });
                console.log(`Cleaned up directory: ${dir}`);
            }
        } catch (error) {
            cleanupSuccessful = false;
            console.error(`Failed to clean up directory: ${dir}`);
        }
    }));

    if (cleanupSuccessful) {
        console.log('Cleanup completed successfully');
    } else {
        console.log('Cleanup completed with some errors');
    }
}
