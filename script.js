const searchBars = document.querySelectorAll('.search-bar');
const resultsContainer = document.getElementById('search-results');

// Fetch the links data (assuming you'll keep it in 'all_links.json')
fetch('all_links.json')
    .then(response => response.json())
    .then(linksData => {
        // Store the fetched data for later use
        let allLinks = linksData;  

        // Function to update search results
        function updateSearchResults(searchTerm) {
            resultsContainer.innerHTML = ''; // Clear old results

            if (searchTerm === '') {
                // If the search is empty, you might want to show a default message or do nothing
                return; 
            }

            const filteredLinks = allLinks.filter(link => 
                link.title.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (filteredLinks.length === 0) {
                resultsContainer.textContent = 'No results found.';
            } else {
                const resultsList = document.createElement('ul');

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

        // Event listener for search bar changes 
        searchBars.forEach(searchBar => {
            searchBar.addEventListener('input', (event) => {
                const searchTerm = event.target.value.toLowerCase(); 
                updateSearchResults(searchTerm);

                // Update the URL (if needed)
                const queryParams = new URLSearchParams({ q: searchTerm });
                history.pushState({}, '', `${window.location.pathname}?${queryParams.toString()}`);
            });
        });

        // Event listener for URL changes (back/forward buttons etc.)
        window.addEventListener('popstate', () => {
            const queryParams = new URLSearchParams(window.location.search);
            const searchTerm = queryParams.get('q');
            updateSearchResults(searchTerm);
        });

        // Initial search (if there's a search term in the URL on page load)
        const initialSearchParams = new URLSearchParams(window.location.search);
        const initialSearchTerm = initialSearchParams.get('q');
        if (initialSearchTerm) {
            updateSearchResults(initialSearchTerm);
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        // Handle the error gracefully, e.g., display an error message
    });
