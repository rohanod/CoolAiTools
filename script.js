const searchBars = document.querySelectorAll('.search-bar');
const resultsContainer = document.getElementById('search-results'); 
const listPages = ['index.html', 'page2.html', 'page3.html'];


fetch('all_links.json')
    .then(response => response.json())
    .then(linksData => {
        let allLinks = linksData;  

        // Function to update search results (and redirect if needed)
        function updateSearchResults(searchTerm) {
            const currentPage = window.location.pathname.split('/').pop();
            const isOnSearchPage = currentPage === 'search.html';

            if (searchTerm === '') {
                // Redirect to the correct previous page
                if (isOnSearchPage) {
                    // If on search.html, redirect to the last list page visited
                    const lastVisitedListPage = localStorage.getItem('lastListPage') || 'index.html'; // Default to index.html
                    window.location.href = lastVisitedListPage;
                } else {
                    // Go back in browser history from a non-search page
                    window.history.back(); 
                }
            } else {
                // Update the URL with the search term
                const queryParams = new URLSearchParams({ q: searchTerm });
                const newURL = `${window.location.origin}${window.location.pathname}?${queryParams.toString()}`;
                window.history.pushState({}, '', newURL); 

                // Store the current page as the 'last visited' before search
                localStorage.setItem('lastListPage', currentPage); 

                // Logic to fetch/display results and handle redirection
                if (isOnSearchPage) {
                    // Update results on search.html
                    resultsContainer.innerHTML = ''; // Clear old results

                    // Fetch and display results on 'search.html'
                    const filteredLinks = allLinks.filter(link => 
                        link.title.toLowerCase().includes(searchTerm.toLowerCase()) 
                    );

                    if (filteredLinks.length === 0) {
                        resultsContainer.textContent = 'No results found.';
                    } else {
                        filteredLinks.forEach(link => {
                            const resultItem = document.createElement('a');
                            resultItem.href = link.url;
                            resultItem.textContent = link.title;
                            resultsContainer.appendChild(resultItem); 
                        });
                    }

                } else {
                    // Redirect to search.html with search term (after 2-second delay)
                    setTimeout(() => {
                        window.location.href = `search.html?${queryParams.toString()}`;
                    }, 2000); 
                }
            }
        }

        // Event listener for search bar input
        searchBars.forEach(searchBar => {
            searchBar.addEventListener('input', (event) => {
                const searchTerm = event.target.value; 
                updateSearchResults(searchTerm); 
            });
        });

        // Event listener for back/forward button (URL changes)
        window.addEventListener('popstate', () => {
            const queryParams = new URLSearchParams(window.location.search);
            const searchTerm = queryParams.get('q');
            updateSearchResults(searchTerm);
        });

        // Initial search (if needed, likely for your 'search.html' page)
        const initialSearchParams = new URLSearchParams(window.location.search);
        const initialSearchTerm = initialSearchParams.get('q');
        if (initialSearchTerm) {
            updateSearchResults(initialSearchTerm);
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        // Handle error, e.g., display an error message on the relevant pages 
    });
