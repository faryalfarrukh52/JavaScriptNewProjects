// Grab DOM elements from HTML
const word = document.getElementById('right-word');
const popUp = document.getElementById('popup');
const wrongLetter = document.getElementById('wrong-letters');
const notification = document.getElementById('slider');
const restartButton = document.getElementById('restart');
const message = document.getElementById('win-lose');

// to get multiple elements by query all from class
const hangmanParts = document.querySelectorAll('.hangman-part');

// Random words in Array
const wordPool = ['computer', 'watermelon', 'scrambal', 'television', 'javascript'];

// To get random words from array every time on refresh
// Math floor to round up number
let selectedWord = wordPool[Math.floor(Math.random() * wordPool.length)];

// console.log(selectedWord);

// Arrays to classify the input of the user
const correctLetters = [];
const incorrectLetters = [];

// Function to display word on the screen
function displaySelectedWord() {
    word.innerHTML = `
    ${selectedWord
    // split means to separate word element in empty array form
        .split('')
        // map changes string into Array
        .map(
            // make a function of letter to make html of displaying words
        // boolean ? function to check if correctLetters includes users input letter
            letter => `
        
            <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
            </span>
            `
        )
        // join again converts array into string form
        .join('')
    }

    `;
    // Check if the word is completed and if it is match with our selected word using IF statement
    // console.log(word.innerText);
// replace word from multiple lines into one line
    const wordReplace = word.innerText.replace(/\n/g, '');
    // console.log(wordReplace);

    if (wordReplace === selectedWord ) {

        message.innerText = 'You won!!';
        // update display to flex
        popUp.style.display = 'flex';
        
    }
};

// Funtion to update wrong leteers
function updateWrongLetters() {
    // Display updated wrong letters
wrongLetter.innerHTML = `
${incorrectLetters.length > 0 ? `<p>Wrong</p>` : ''}
${incorrectLetters.map( letter => `<span>${letter}</span>`)}
`;
    // show hangman parts on each wrong letter
    hangmanParts.forEach( (part, index) => {
            const errors = incorrectLetters.length;

            if (index < errors) {
                part.style.display = 'block';
            } else {
                part.style.display = 'none';
            }
        });

        // show popup if fails
        if (incorrectLetters.length === hangmanParts.length) {
            message.innerText = 'You lost!';
            popUp.style.display = 'flex';
        }
}

// Funtion to display the sliding notification
function showNotification() {
    notification.classList.add('show');

    setTimeout( () => {
        notification.classList.remove('show');}, 3000 );
}

// Event Handlers
// 1.Event Handler for keyboard Button Press
window.addEventListener('keydown', e => {
    if ( e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        // console.log(letter);

        if ( selectedWord.includes(letter) ) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displaySelectedWord();
            } else {
                showNotification();
            }
            
        } else {
            if (!incorrectLetters.includes(letter)) {
                incorrectLetters.push(letter);
                updateWrongLetters();
            } else {
                showNotification();
            }
        }
    }
})

// 2. Event for restart button

restartButton.addEventListener('click', () =>{
    // Empty Arrays
    correctLetters.splice(0);
    incorrectLetters.splice(0);

    //  Get a new selected word from wordpool
    selectedWord = wordPool[Math.floor(Math.random() * wordPool.length)];

    displaySelectedWord();

    // Clear the wrong letter Div
    updateWrongLetters();
 
    // Hide popup
    popUp.style.display = 'none';


})

displaySelectedWord();