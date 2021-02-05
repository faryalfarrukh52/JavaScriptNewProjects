// Getting DOM elements
// Get the search form
const form = document.getElementById('form');
// Get the input search field
const search = document.getElementById('search');
// Get results
const result = document.getElementById('results');
// Get the pagination 
const paginate = document.getElementById('pagination');

// Get lyrics API and store into a variable
const api = 'https://api.lyrics.ovh';

// Event Listeners
// 1. Event Listener for a search form 
form.addEventListener('submit', e => {
    // Prevent the page to reload after submit
    e.preventDefault();
    // Get the Search Term from the input field
    const searchTerm = search.value.trim();
    // Check if search term contains value
    if (searchTerm) {
        // Get function
        searchSongs(searchTerm);
    } else {
        alert('Please enter a valid search')
    }
});