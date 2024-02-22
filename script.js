const searchBars = document.querySelectorAll('.search-bar');

searchBars.forEach(searchBar => {
    searchBar.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase().trim(); // Improved: adds .trim()

        if (searchTerm === '') {
            clearSearchResults(); // Clear previous results
            return; // Stop if empty search
        }

        updateSearchResults(searchTerm);
    });
});

function updateSearchResults(searchTerm) {
    const resultsContainer = document.getElementById('search-results'); 
    resultsContainer.innerHTML = '<p>Loading results...</p>'; // Indicate loading

    fetch('all_links.json') 
        .then(response => response.json())
        .then(linksData => {
            renderSearchResults(linksData, searchTerm, resultsContainer);
        })
        .catch(error => {
            resultsContainer.innerHTML = '<p>Error fetching data. Try again later.</p>';
            console.error('Error fetching data:', error); 
        });
}

function renderSearchResults(linksData, searchTerm, resultsContainer) {
    const filteredLinks = linksData.filter(link => 
        link.title.toLowerCase().includes(searchTerm)
    );

    resultsContainer.innerHTML = ''; // Clear previous state

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

function clearSearchResults() {
    const resultsContainer = document.getElementById('search-results'); 
    resultsContainer.innerHTML = '';
}
