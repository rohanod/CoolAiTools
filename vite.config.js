import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

// Dynamically find all HTML files in the public directory
const htmlFiles = fs.readdirSync('public')
  .filter(file => file.endsWith('.html'))
  .reduce((acc, file) => ({
    ...acc,
    [path.parse(file).name]: `public/${file}`
  }), {});

export default defineConfig({
  root: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: htmlFiles
    }
  },
  publicDir: '../public',
  base: '/',
  server: {
    port: 3000,
    host: true
  }
});