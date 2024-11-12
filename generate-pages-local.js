const fs = require('fs');
const http = require('http');
const path = require('path');

const links = JSON.parse(fs.readFileSync('all_links.json', 'utf8'));
const itemsPerPage = 15;
const totalPages = Math.ceil(links.length / itemsPerPage);
const generatedFiles = [];

function generatePages() {
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
    <link rel="stylesheet" href="style.css">
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
    <script src="script.js"></script>
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
    <link rel="stylesheet" href="style.css">
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
    <script src="script.js"></script>
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
    <link rel="stylesheet" href="style.css">
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
    <script src="script.js"></script>
</body>
</html>`;

  fs.writeFileSync('search.html', searchHtml);
  generatedFiles.push('search.html');
}

function cleanup() {
  generatedFiles.forEach(file => {
    try {
      fs.unlinkSync(file);
    } catch (err) {
      console.error(`Error removing ${file}:`, err);
    }
  });
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);

generatePages();

const port = 3000;
const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') filePath = './index.html';

  const extname = path.extname(filePath);
  let contentType = 'text/html';
  
  switch (extname) {
    case '.js': contentType = 'text/javascript'; break;
    case '.css': contentType = 'text/css'; break;
    case '.json': contentType = 'application/json'; break;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        res.writeHead(500);
        res.end('500 Internal Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  console.log('Press Ctrl+C to stop the server and clean up generated files');
});