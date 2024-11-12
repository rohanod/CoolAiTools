document.addEventListener('DOMContentLoaded', function() {
  const searchBar = document.getElementById('search-bar');
  const resultsContainer = document.getElementById('search-results');
  const itemsPerPage = 15;
  let allLinks = [];

  // Fetch and process links
  fetch('all_links.json')
    .then(response => response.json())
    .then(data => {
      allLinks = data;
      setupPagination();
      handleSearch();
    })
    .catch(error => console.error('Error loading links:', error));

  // Setup pagination
  function setupPagination() {
    const totalPages = Math.ceil(allLinks.length / itemsPerPage);
    const paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      const link = document.createElement('a');
      link.href = i === 1 ? 'index.html' : `page${i}.html`;
      link.textContent = i;
      if (window.location.pathname.endsWith(link.href)) {
        link.classList.add('active');
      }
      paginationContainer.appendChild(link);
    }
  }

  // Handle search functionality
  function handleSearch() {
    if (!searchBar) return;

    searchBar.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredLinks = allLinks.filter(link => 
        link.title.toLowerCase().includes(searchTerm)
      );

      displaySearchResults(filteredLinks);
    });
  }

  function displaySearchResults(results) {
    if (!resultsContainer) return;

    resultsContainer.innerHTML = '';
    if (results.length === 0) {
      resultsContainer.innerHTML = '<p>No results found</p>';
      return;
    }

    results.forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.textContent = link.title;
      a.target = '_blank';
      resultsContainer.appendChild(a);
    });
  }

  // Add click animation
  document.querySelectorAll('a').forEach(element => {
    element.addEventListener('click', function() {
      this.classList.add('animate-on-click');
      this.addEventListener('animationend', () => {
        this.classList.remove('animate-on-click');
      }, { once: true });
    });
  });
});