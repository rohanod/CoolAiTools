export const getPageTemplate = (title, content, currentPage = 1) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="/style.css">
    <meta name="description" content="Directory of AI tools and demos">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <meta name="theme-color" content="#ffffff">
</head>
<body>
    <header>
        <h1>Welcome to Cool AI Tools</h1>
        <p>If a page says forbidden embedding, add /? to the end of the URL</p>
        <nav>
            <a href="/index.html" ${currentPage === 1 ? 'class="active"' : ''}>Home</a>
        </nav>
        <div class="search-container">
            <input type="text" id="search-bar" placeholder="Search for tools..." ${currentPage === 'search' ? 'autofocus' : ''}>
        </div>
    </header>
    <main>
        <div id="search-results" class="search-results"></div>
        ${currentPage === 'search' ? `<div class="search-instructions"><p>Start typing to search through all AI tools</p></div>` : ''}
        <div class="main-content">${content}</div>
    </main>
    <script src="/script.js" defer></script>
</body>
</html>`;

export const getLinkItem = (link) => `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.title}</a>`;

export const getPaginationLinks = (currentPage, totalPages) => {
    const links = [];
    currentPage > 1 && links.push(`<a href="${currentPage === 2 ? '/index.html' : `/page${currentPage - 1}.html`}" class="nav-button">←</a>`);
    
    for (let i = 1; i <= totalPages; i++) {
        links.push(`<a href="${i === 1 ? '/index.html' : `/page${i}.html`}" ${i === currentPage ? 'class="active"' : ''}>${i}</a>`);
    }
    
    currentPage < totalPages && links.push(`<a href="/page${currentPage + 1}.html" class="nav-button">→</a>`);
    
    return `<div class="pagination">${links.join('')}</div>`;
};
