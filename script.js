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
