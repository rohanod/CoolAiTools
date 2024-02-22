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

        if (searchTerm === '') { 
            window.history.back(); 
        } else {
            // Update the URL with the search term
            const queryParams = new URLSearchParams({ q: searchTerm }); 
            window.history.pushState({}, '', `search.html?${queryParams.toString()}`);
        }
    }, 300);  

    searchBar.addEventListener('input', searchWithDelay);
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

            // Clear existing results 
            resultsContainer.innerHTML = '';

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
    });
