document.addEventListener('DOMContentLoaded', function() {
    let spaceStatus = {};
    let searchData = [];
    let currentMainContent = '';
    let isSearchPage = window.location.pathname.endsWith('search.html');

    async function loadData() {
        try {
            const [statusResponse, linksResponse] = await Promise.all([
                fetch('space_status.json'),
                fetch('all_links.json')
            ]);
            spaceStatus = await statusResponse.json();
            searchData = await linksResponse.json();
        } catch (e) {
            console.error('Failed to load data:', e);
        }
    }

    function updateMainContent() {
        const mainContent = document.querySelector('.main-content');
        if (!mainContent) return;
        
        if (!currentMainContent) {
            currentMainContent = mainContent.innerHTML;
        }
        
        const links = mainContent.querySelectorAll('a[href*="hf.space"]');
        links.forEach(link => {
            const status = spaceStatus[link.href]?.status;
            if (status && status !== "is-working") {
                if (!link.querySelector('.error-label')) {
                    const errorLabel = document.createElement('span');
                    errorLabel.className = 'error-label';
                    errorLabel.textContent = status === "non-working" ? 'NOT WORKING' : 'ERROR';
                    link.appendChild(errorLabel);
                }
            }
        });
    }

    function searchTools(query) {
        if (!query) return [];
        
        query = query.toLowerCase();
        const results = searchData
            .map(item => {
                const titleScore = item.title.toLowerCase().includes(query) ? 2 : 0;
                const urlScore = item.url.toLowerCase().includes(query) ? 1 : 0;
                return {
                    ...item,
                    score: titleScore + urlScore
                };
            })
            .filter(item => {
                const status = spaceStatus[item.url]?.status;
                return item.score > 0 && status !== "404";
            })
            .sort((a, b) => b.score - a.score);

        return results;
    }

    function displaySearchResults(results, query) {
        const searchResults = document.getElementById('search-results');
        const mainContent = document.querySelector('.main-content');
        const searchInstructions = document.querySelector('.search-instructions');
        
        if (!searchResults || !mainContent) return;

        if (!query) {
            searchResults.style.display = 'none';
            if (!isSearchPage) {
                mainContent.style.display = 'block';
                mainContent.innerHTML = currentMainContent;
                updateMainContent();
            } else {
                mainContent.style.display = 'none';
                if (searchInstructions) {
                    searchInstructions.style.display = 'block';
                }
            }
            return;
        }

        if (!results.length) {
            searchResults.style.display = 'block';
            searchResults.innerHTML = '<p class="no-results">No results found</p>';
            mainContent.style.display = 'none';
            if (searchInstructions) {
                searchInstructions.style.display = 'none';
            }
            return;
        }

        const resultsHtml = results
            .map(item => {
                const status = spaceStatus[item.url]?.status;
                const isWorking = status === "is-working";
                return `
                    <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="search-result">
                        <span class="result-title">${item.title}</span>
                        ${!isWorking ? '<span class="error-label">NOT WORKING</span>' : ''}
                    </a>
                `;
            })
            .join('');

        searchResults.style.display = 'block';
        searchResults.innerHTML = resultsHtml;
        mainContent.style.display = 'none';
        if (searchInstructions) {
            searchInstructions.style.display = 'none';
        }
    }

    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
        let debounceTimeout;
        searchBar.addEventListener('input', (e) => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                const query = e.target.value.trim();
                const results = query ? searchTools(query) : [];
                displaySearchResults(results, query);
            }, 1000);
        });
    }

    async function init() {
        await loadData();
        updateMainContent();
    }

    init();
});
