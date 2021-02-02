// document.querySelector // get content by class 
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

console.log(typeof ticketPrice);

populateUI();

// pull data from Local Storage to build UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    // console.log(selectedSeats);
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

}

// function to update count seats selected
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const countSelectedSeats = selectedSeats.length;
    // console.log(countSelectedSeats);

    // change NodeList into Array for saving data map executes function to each element and it is use to return array hence we create a new index value 

    // const seatsIndex = [...selectedSeats].map(function(seat) {
    //     return [...seats].indexOf(seat); // short form is down

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    // saving Array data in to Local Storage in key and value
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    // console.log(seatsIndex);

    count.innerText = countSelectedSeats;
    total.innerText = ticketPrice * countSelectedSeats;
}

// Function to save the selected movie and its price into local storage
function setMovieData(movieIndex, moviePrice) {

    localStorage.setItem('selectedMovieIndex', JSON.stringify(movieIndex));
    localStorage.setItem('selectedMoviePrice', JSON.stringify(moviePrice));
}

// Event listener for Change on Select Movie
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

// Event listener for Click on Available Seats\
// new way for writing function in ES 6 (e) => {}

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        // console.log(e.target);
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})

// Calculate initial number of seats and total price
updateSelectedCount();