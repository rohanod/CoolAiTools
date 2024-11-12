const fs = require('fs');

const links = JSON.parse(fs.readFileSync('all_links.json', 'utf8'));
const itemsPerPage = 15;
const totalPages = Math.ceil(links.length / itemsPerPage);
const baseUrl = '/ai-tools-directory';
const generatedFiles = [];

for (let i = 1; i <= totalPages; i++) {
  const startIdx = (i - 1) * itemsPerPage;
  const pageLinks = links.slice(startIdx, startIdx + itemsPerPage);
  
  const linksHtml = pageLinks.map(link => 
    `    <a href="${link.url}" target="_blank">${link.title}</a>`
  ).join('\n');

  const pageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Tools Directory - Page ${i}</title>
    <link rel="stylesheet" href="${baseUrl}/style.css">
</head>
<body>
    <header>
        <h1>Welcome to Cool AI Tools</h1>
        <p>If a page says forbidden embedding, add /? to the end of the URL</p>
        <div class="search-container">
            <input type="text" id="search-bar" placeholder="Search for tools...">
            <div id="search-results"></div>
        </div>
    </header>

    <main>
${linksHtml}
    </main>

    <div class="pagination"></div>

    <footer></footer>
    <script src="${baseUrl}/script.js"></script>
</body>
</html>`;

  const filename = i === 1 ? 'index.html' : `page${i}.html`;
  fs.writeFileSync(filename, pageHtml);
  generatedFiles.push(filename);
}

const allLinksHtml = links.map(link => 
  `    <a href="${link.url}" target="_blank">${link.title}</a>`
).join('\n');

const linksPageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>All AI Tools</title>
    <link rel="stylesheet" href="${baseUrl}/style.css">
</head>
<body>
    <header>
        <h1>All AI Tools</h1>
        <div class="search-container">
            <input type="text" id="search-bar" placeholder="Search for tools...">
            <div id="search-results"></div>
        </div>
    </header>

    <main>
${allLinksHtml}
    </main>

    <div class="pagination"></div>

    <footer></footer>
    <script src="${baseUrl}/script.js"></script>
</body>
</html>`;

fs.writeFileSync('links.html', linksPageHtml);
generatedFiles.push('links.html');

const searchHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search AI Tools</title>
    <link rel="stylesheet" href="${baseUrl}/style.css">
</head>
<body>
    <header>
        <h1>Search AI Tools</h1>
        <div class="search-container">
            <input type="text" id="search-bar" placeholder="Search for tools..." autofocus>
            <div id="search-results"></div>
        </div>
    </header>

    <div class="pagination"></div>

    <footer></footer>
    <script src="${baseUrl}/script.js"></script>
</body>
</html>`;

fs.writeFileSync('search.html', searchHtml);
generatedFiles.push('search.html');

process.on('SIGINT', () => {
  generatedFiles.forEach(file => {
    try {
      fs.unlinkSync(file);
    } catch (err) {
      console.error(`Error removing ${file}:`, err);
    }
  });
  process.exit(0);
});