## AI Tools Directory

A static website showcasing various AI tools and demos. The site is automatically generated from `all_links.json` and can be deployed both locally and to GitHub Pages.

### Local Development

To run locally:

```bash
node generate-pages-local.js
```

This will generate the pages and start a local server at http://localhost:3000

### GitHub Pages Deployment

To deploy to GitHub Pages:

1. Fork this repository
2. Enable GitHub Pages in your repository settings:
   - Go to Settings > Pages
   - Set source to "GitHub Actions"
3. Update the `baseUrl` in `generate-pages-github.js` to match your repository name
4. Push changes to the main branch

The site will automatically deploy using GitHub Actions.

### Adding New Tools

Add new tools by updating the `all_links.json` file. The pages will be automatically regenerated.