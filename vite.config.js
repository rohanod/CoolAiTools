import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'public',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        search: 'search.html',
        style: 'style.css',
        script: 'script.js',
        links: 'all_links.json',
        status: 'space_status.json',
        manifest: 'site.webmanifest'
      }
    },
    minify: true,
    sourcemap: false,
    assetsDir: 'assets'
  },
  base: '/',
  publicDir: 'public'
});
