const searchBars = document.querySelectorAll('.search-bar'); 

searchBars.forEach(searchBar => {
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(null, args);
            }, delay);
        };
    };

    const searchWithDelay = debounce((event) => {
        const searchTerm = event.target.value.toLowerCase();
        let currentPage = 1; 

        // Get the current page number (if present)
        const queryParams = new URLSearchParams(window.location.search);
        const pageParam = queryParams.get('p');
        if (pageParam) {
            currentPage = parseInt(pageParam); 
        }

        if (searchTerm === '') { // Check for empty search
            window.history.back(); // Go back to the previous page
        } else {
            // Redirect with the search term
            const queryParams = new URLSearchParams({ q: searchTerm, p: currentPage });
            window.location.href = 'search.html?' + queryParams.toString();
        }
    }, 300); // 300 milliseconds delay

    searchBar.addEventListener('input', searchWithDelay);
});

// Code for search.html (Since the script is on all pages, this part becomes relevant everywhere)
const searchBar = document.getElementById('search-bar');
const resultsContainer = document.getElementById('search-results');
const paginationControls = document.getElementById('pagination-controls'); // Assuming this exists

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

            // ... (Your code to display the 'filteredLinks' in 'search-results') ...

            //  Pagination generation
            paginationControls.innerHTML = ''; // Clear any existing pagination
            const itemsPerPage = 10; 
            const currentPage = parseInt(queryParams.get('p')) || 1; 
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const pageResults = filteredLinks.slice(startIndex, endIndex); 

            for (let i = 1; i <= Math.ceil(filteredLinks.length / itemsPerPage); i++) {
                const link = document.createElement('a');
                link.textContent = i;
                link.href = `search.html?q=${searchTerm}&p=${i}`; 
                paginationControls.appendChild(link);
            }
        }
    });
