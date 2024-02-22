const searchBars = document.querySelectorAll('.search-bar'); 

searchBars.forEach(searchBar => {
    searchBar.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') { 
            const searchTerm = event.target.value.toLowerCase();
            let currentPage = 1; 

            // Get the current page number (if present)
            const queryParams = new URLSearchParams(window.location.search);
            const pageParam = queryParams.get('p');
            if (pageParam) {
                currentPage = parseInt(pageParam); 
            }

            if (searchTerm) {
                // Search with the term
                const queryParams = new URLSearchParams({ q: searchTerm, p: currentPage });
                window.location.href = 'search.html?' + queryParams.toString();
            } else {
                // Go back to previous page
                window.history.back();
            }
        }
    });
});

// Code for search.html (Since the script is on all pages, this part becomes relevant everywhere)
const searchBar = document.getElementById('search-bar');
const resultsContainer = document.getElementById('search-results');

// Fetch links data
fetch('all_links.json') 
    .then(response => response.json())
    .then(linksData => {
        const queryParams = new URLSearchParams(window.location.search);
        const searchTerm = queryParams.get('q');

        if (searchTerm) {
            searchBar.value = searchTerm; 

            const filteredLinks = linksData.filter(link => 
                link.title.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (filteredLinks.length === 0) {
                resultsContainer.textContent = 'No results found.';
            } else {
                // Create an unordered list without bullet points
                const resultsList = document.createElement('ul'); 
                resultsList.style.listStyleType = 'none'; 

                filteredLinks.forEach(link => {
                    const listItem = document.createElement('li');
                    const linkElement = document.createElement('a');
                    linkElement.textContent = link.title;
                    linkElement.href = link.url;
                    listItem.appendChild(linkElement);
                    resultsList.appendChild(listItem);                    
                });
                resultsContainer.appendChild(resultsList);

                // ... (Add your pagination generation code here) ...
            } 
        }
    });
