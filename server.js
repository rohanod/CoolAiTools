const http = require('http');
const fs = require('fs');
const path = require('path');

function createServer(port) {
  const server = http.createServer((req, res) => {
    let filePath = path.join('./', req.url === '/' ? 'index.html' : req.url);

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
    console.log('Press Ctrl+C to stop the server and clean up generated files');
  });

  return server;
}

module.exports = createServer;