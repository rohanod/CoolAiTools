const fs = require('fs');
const http = require('http');
const path = require('path');

const links = JSON.parse(fs.readFileSync('all_links.json', 'utf8'));
const otherStuff = JSON.parse(fs.readFileSync('other_stuff.json', 'utf8'));
const itemsPerPage = 15;
const totalPages = Math.ceil(links.length / itemsPerPage);
const port = 80;

if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

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
    <meta name="description" content="Directory of AI tools and demos">
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
    fs.writeFileSync(`public/${filename}`, pageHtml);
  }

  const otherStuffHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Secret Stuff</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Secret Collection</h1>
    </header>

    <main>
        <section class="links-section">
            <h2>Links</h2>
            ${otherStuff.links.map(link => 
              `<a href="${link.url}" target="_blank">${link.title}</a>`
            ).join('\n')}
        </section>

        <section class="prompts-section">
            <h2>Prompts</h2>
            ${otherStuff.prompts.map(prompt => 
              `<div class="prompt-card">
                <h3>${prompt.title}</h3>
                <p>${prompt.prompt}</p>
              </div>`
            ).join('\n')}
        </section>
    </main>

    <footer></footer>
    <script src="script.js"></script>
</body>
</html>`;

  fs.writeFileSync('public/other_stuff.html', otherStuffHtml);

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

  fs.writeFileSync('public/search.html', searchHtml);

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

  fs.writeFileSync('public/links.html', linksPageHtml);

  fs.copyFileSync('style.css', 'public/style.css');
  fs.copyFileSync('script.js', 'public/script.js');
  fs.copyFileSync('all_links.json', 'public/all_links.json');
  fs.copyFileSync('other_stuff.json', 'public/other_stuff.json');
}

generatePages();

const server = http.createServer((req, res) => {
  let filePath = './public' + req.url;
  if (filePath === './public/') filePath = './public/index.html';

  const extname = path.extname(filePath);
  const contentTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json'
  };
  const contentType = contentTypes[extname] || 'text/html';

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
});