const searchBars = document.querySelectorAll('.search-bar'); // Target all search bars

searchBars.forEach(searchBar => {
    searchBar.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') { // Check if the Enter key was pressed
            const searchTerm = event.target.value.toLowerCase();

            // Redirect to search page with results
            const queryParams = new URLSearchParams({ q: searchTerm });
            window.location.href = 'search.html?' + queryParams.toString();
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

        // Get search term from URL 
        const queryParams = new URLSearchParams(window.location.search);
        const searchTerm = queryParams.get('q');

        if (searchTerm) {
            searchBar.value = searchTerm; // Pre-fill search bar

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
