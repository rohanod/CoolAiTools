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
      input: htmlFiles,
      output: {
        manualChunks: {
          vendor: ['node-fetch']
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace']
      }
    },
    reportCompressedSize: false,
    cssCodeSplit: false,
    assetsInlineLimit: 4096,
    sourcemap: false
  },
  base: '/',
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    hmr: {
      overlay: false
    }
  }
});
