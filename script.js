const searchBars = document.querySelectorAll('.search-bar'); // Target all search bars

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

            // Redirect, either keeping or removing the query depending on if search input is empty
            if (searchTerm) {
                const queryParams = new URLSearchParams({ q: searchTerm, p: currentPage });
                window.location.href = 'search.html?' + queryParams.toString();
            } else {
                // No search term, redirect to the specified page only
                const queryParams = new URLSearchParams({ p: currentPage });
                window.location.href = 'search.html?' + queryParams.toString();
            }
        }
    });
});

// Code for search.html (or include within script.js if on all pages)
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
                resultsList.style.listStyleType = 'none'; // Remove bullet points

                filteredLinks.forEach(link => {
                    const listItem = document.createElement('li');
                    const linkElement = document.createElement('a');
                    linkElement.textContent = link.title;
                    linkElement.href = link.url;
                    listItem.appendChild(linkElement);
                    resultsList.appendChild(listItem);                    
                });
                resultsContainer.appendChild(resultsList);
            } 
        }
    });
