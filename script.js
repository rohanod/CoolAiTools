const searchBars = document.querySelectorAll('.search-bar');
const resultsContainer = document.getElementById('search-results');
const listPages = ['index.html', 'page2.html', 'page3.html']; // Update with your list pages

// Fetch links data on script load
fetch('all_links.json')
    .then(response => response.json())
    .then(linksData => {
        let allLinks = linksData;  

        // Update search results function
        function updateSearchResults(searchTerm) {
            resultsContainer.innerHTML = ''; 

            if (searchTerm === '') {
                const currentPage = window.location.pathname.split('/').pop();

                if (listPages.includes(currentPage)) {
                    const currentIndex = listPages.indexOf(currentPage);
                    const prevIndex = (currentIndex - 1 + listPages.length) % listPages.length; 
                    const prevListPage = listPages[prevIndex]; 
                    window.location.href = prevListPage; 
                } else {
                    window.history.back(); 
                }
            } else {
                const filteredLinks = allLinks.filter(link => 
                    link.title.toLowerCase().includes(searchTerm.toLowerCase())
                );

                if (filteredLinks.length === 0) {
                    resultsContainer.textContent = 'No results found.';
                } else {
                    const resultsList = document.createElement('ul');
                    filteredLinks.forEach(link => { /* ... (create list items) ... */ }); 
                    resultsContainer.appendChild(resultsList);
                }
            }
        }

        // Event listener for search bar input
        searchBars.forEach(searchBar => {
            searchBar.addEventListener('input', (event) => {
                const searchTerm = event.target.value.toLowerCase(); 
                updateSearchResults(searchTerm);

                // Update the URL 
                const queryParams = new URLSearchParams({ q: searchTerm });
                history.pushState({}, '', `${window.location.pathname}?${queryParams.toString()}`);
            });
        });

        // Event listener for back/forward button (URL changes)
        window.addEventListener('popstate', () => {
            const queryParams = new URLSearchParams(window.location.search);
            const searchTerm = queryParams.get('q');
            updateSearchResults(searchTerm);
        });

        // Initial search from the URL on page load
        const initialSearchParams = new URLSearchParams(window.location.search);
        const initialSearchTerm = initialSearchParams.get('q');
        if (initialSearchTerm) {
            updateSearchResults(initialSearchTerm);
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        // Handle error, e.g., display an error message
    });
