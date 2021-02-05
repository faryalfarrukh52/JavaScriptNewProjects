// Getting Elements from DOM
// Elements from Card Container
const clearCardBtn = document.getElementById('clear');
const addNewCardBtn = document.getElementById('add-new-card');
const cardContainer = document.getElementById('card-container');
// Elements from Navigation
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const currentCard = document.getElementById('current-card');
// Elements from Add Card Container
const addCardContainer = document.getElementById('add-card-container');
const closeCardBtn = document.getElementById('close-card');
const questionText = document.getElementById('question');
const answerText = document.getElementById('answer');
const addCardButton = document.getElementById('add-card-btn');


cardContainer.innerHTML = `<p>No Card Added</p>`

// Track Current Card
let currentActiveCard = 0;

// Collection of cards DOM elements 
const cardElements = [];

// Collection of card data in the form of Array
// const cardsData = [{
//         question: 'What is HTML?',
//         answer: "HTML stands for Hypertext Markup Language, it's used for creating the structure of a web page."
//     },
//     {
//         question: 'What is CSS?',
//         answer: "CSS stands for Cascading Style Sheet, it's used for designing the structure of a web page."
//     }
// ];
const cardData = getCardsData();
// console.log(cardData);


// FUNCTIONS
//1. Function to create all cards
function createCards() {
    cardData.forEach((data, index) => createCard(data, index));
}

//2. Function to create a single card
function createCard(data, index) {

    // Create the div for the card
    const card = document.createElement('div');
    // Assign class to the div
    card.classList.add('card');
    // Check for first card and assign active card/ make it active
    if (index === 0) {
        card.classList.add('active');
    }
    // Create the Inner HTML of the Card
    card.innerHTML = `
    <div class="inner-card">
    <div class="card-front">
        <p>${data.question}</p>
    </div>
    <div class="card-back">
        <p>${data.answer}</p>
    </div>

    `;

    // Add EventListener to the flip the card

    // cardContainer.innerHTML = '';
    card.addEventListener('click', () => card.classList.toggle('show-answer'));

    // Add the newly created card to the collection od DOM/ARRAY with the push function
    cardElements.push(card);

    // Display tht card to the DOM/SCREEN
    cardContainer.appendChild(card);

    // Display the current card number / total card number on DOM/SCREEN
    updateCurrentCardText();
}

//3. Funtion to display current card No / Total cards in the navigation
function updateCurrentCardText() {
    currentCard.innerHTML = `<p>${currentActiveCard +1}/${cardElements.length}</p>`;
}

//4. Function to Get Cards from the local storage
function getCardsData() {
    // get data and store it. and change it into JSON 
    const getCards = JSON.parse(localStorage.getItem('cards'));
    // check if the data exists or not
    return getCards === null ? [] : getCards;

}

// 5. Function to store card data to local storage and show on screen DOM
function saveCardData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    // Reload page
    window.location.reload();
}


// on page reload this function work it has everything inside.
createCards();

// Event Listeners
// 1. Event Listeners for next Button
nextButton.addEventListener('click', () => {
    // Hide the current card and move to left
    cardElements[currentActiveCard].className = 'card left';
    // Increament the current active card tracker to next
    currentActiveCard++;
    // check if card last and it should not be great than total number
    if (currentActiveCard > cardElements.length - 1) {
        currentActiveCard = cardElements.length - 1;
        currentActiveCard = 0;
    }

    // Display the new card after next button
    cardElements[currentActiveCard].className = 'card active';

    // Update the current card number
    updateCurrentCardText();
});

// 2. Event Listeners for previous Button
prevButton.addEventListener('click', () => {
    // Hide the current card and move to left
    cardElements[currentActiveCard].className = 'card right';
    // Increament the current active card tracker to next
    currentActiveCard--;
    // check if card last and it should not be great than total number
    if (currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    // Display the new card after next button
    cardElements[currentActiveCard].className = 'card active';


    // Update the current card number
    updateCurrentCardText();
});

// 3. Event Listeners to Create Add New Card Button
addNewCardBtn.addEventListener('click', () => {
    addCardContainer.classList.add('show');
});

//4.Event listener to close Add new Card form
closeCardBtn.addEventListener('click', () => {
    addCardContainer.classList.remove('show');
})

// 5.Event Listener for Creating a New card
addCardButton.addEventListener('click', () => {
    // Get users inputs
    const questionInput = questionText.value;
    const answerInput = answerText.value;

    // check if there are values/data in Q/A
    if (questionInput.trim() && answerInput.trim()) {
        const newCard = { question: questionInput, answer: answerInput }
            // Create a new object, using a card element, using the creatCard function
        createCards(newCard);

        console.log(newCard);
        // Reset form fields
        questionText.value = '';
        answerText.value = '';

        // Hide form after submitting
        addCardContainer.classList.remove('show');
        // Add the New Card object to the cardData array
        cardData.push(newCard);
        // store data to the local storage and reload page
        saveCardData(cardData);
    }
})

// 6. Event Listener to clear all the cards
clearCardBtn.addEventListener('click', () => {
    localStorage.clear();
    cardContainer.innerHTML = '';
    window.location.reload;
    cardContainer.innerHTML = `<p>No Card Added</p>`
        // Update the cirrent card reload
    currentCard.innerHTML = `<p></p>`
})