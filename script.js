const searchBar = document.getElementById('search-bar');
const resultsContainer = document.getElementById('search-results');

fetch('all_links.json') 
    .then(response => response.json())
    .then(linksData => {
        searchBar.addEventListener('keyup', (event) => {
            const searchTerm = event.target.value.toLowerCase();
            resultsContainer.innerHTML = ''; 

            const filteredLinks = linksData.filter(link => 
                link.title.toLowerCase().includes(searchTerm)
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
        });
    });
