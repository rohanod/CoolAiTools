import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

const htmlFiles = fs.readdirSync('.')
  .filter(file => file.endsWith('.html'))
  .reduce((acc, file) => ({
    ...acc,
    [path.parse(file).name]: file
  }), {});

export default defineConfig({
  build: {
    outDir: 'public',
    emptyOutDir: true,
    rollupOptions: {
      input: htmlFiles
    }
  },
  base: '/',
  server: {
    port: 3000,
    host: true
  }
});
