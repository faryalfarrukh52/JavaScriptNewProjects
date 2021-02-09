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

// we use async function when we call API
// Functions
// Function to search song title and artist from API
async function searchSongs(term) {
    const res = await fetch(`${api}/suggest/${term}`)
    const data = await res.json();
    console.log(data);
    showData(data);
}

//2. Function to display search data in to results div
function showData(data) {
    // Display the first set of songs in the DOM
    results.innerHTML = `
  <ul class="songs">
      ${data.data.map( 
              song =>  `
                  <li>
                      <span>${song.artist.name} - ${song.title}</span>
                      <button class="btn" data-artist="${song.artist.name}" data-title="${song.title}">Get Lyrics</button>
                      </li>
                      <hr/>
              `
          ).join('')
      }
  </ul>
`;


    // Add Pagination if required
    if (data.prev || data.next) {
        paginate.innerHTML = `
        ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
        ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
        `;
    }else{
        paginate.innerHTML = '';
    }
}

// 3. Function to get the previous or next songs from API
async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();

    showData(data);
}

// 4. Function to get lyrics from API 
async function getLyrics(artist, title) {
    const res = await fetch(`${api}/v1/${artist}/${title}`)
    const data = await res.json();
    // console.log(data);
    
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '</br>');
    
    result.innerHTML = `
    <h2> ${artist} - ${title}</h2>
    <p>${lyrics}</p>
    `;

    paginate.innerHTML = '';
}

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

// 2. Event Listener to show lyrics on click
result.addEventListener('click', e => {
    // Find out what was clicked
    // console.log(e.target);
    const checkElement = e.target;
    // Check if target is a Button
    // console.log(e.target.tagName);
    if (checkElement.tagName === 'BUTTON') {
        // Get artist and title from HTML5 attribute property on button
        const artist = checkElement.getAttribute('data-artist');
        const title = checkElement.getAttribute('data-title');
        // Now Fetch the lyrics 
        getLyrics(artist,title);
    }
})