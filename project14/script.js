// Get all DOM elements required
// HTML5 Main element for the grid
const main = document.getElementById('main');
// Select box for changing voices
const voiceSelect = document.getElementById('voices');
// Toggle button to display custom text input
const toggleBtn = document.getElementById('toggle');
// Button to close the custom text div
const closeBtn = document.getElementById('close');
// Text area for custom text input
const customText = document.getElementById('text');
// Button to read the custom text input
const readBtn = document.getElementById('read');
// Custom Text Div
const customTextDiv = document.getElementById('custom-text');

//1. Create Array for holding all images and text data
const data = [{
        image: './img/aurora.jpg',
        text: 'Hello World'
    },
    {
        image: './img/bird.jpg',
        text: "I want to fly like a bird"
    },
    {
        image: './img/city.jpg',
        text: "I'ts a very busy life"
    },
    {
        image: './img/flowers.jpg',
        text: "flowers makes life beautiful"
    },
    {
        image: './img/forest.jpg',
        text: "A life never explained"
    },
    {
        image: './img/horse.jpg',
        text: "I want to be strong like a horse"
    },
    {
        image: './img/house.jpg',
        text: " feel comfortable and safe"
    },
    {
        image: './img/mountains.jpg',
        text: "A natural Beauty made by God"
    }
]

// Array for all Web Speech API Voices
let voices = [];

// Create a box for each object in the data array
data.forEach(createBox);

// Functions
// 1. Function to create speech boxes
function createBox(imageObj) {
    // Create empty div for the image to be added to the main grid later
    const box = document.createElement('div');
    // Get the image url and text from the data array
    const { image, text } = imageObj;
    // Apply a CSS class to the new div
    box.classList.add('box');
    // Add the image inside the box
    box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="imageInfo">${text}</p>
    `;
    // Add event for speaking text
    box.addEventListener('click', () => {
            setMessage(text);
            speakText();
        })
        // Add the new box to the DOM
    main.appendChild(box);
}

// Initialize speech synthesis
const message = new SpeechSynthesisUtterance();

// 2. Function to get voices from Web Speech API and put into the select box
function populateVoiceList() {
    if (typeof speechSynthesis === 'undefined') {
        return;
    }

    let voices = speechSynthesis.getVoices();
    console.log(voices);
    voicesBackup = voices;

    for (var i = 0; i < voices.length; i++) {
        var option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

        if (voices[i].default) {
            option.textContent += ' -- DEFAULT';
        }

        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        voiceSelect.appendChild(option);

    }
}

// 3. Set the text for speech synthesis
function setMessage(text) {
    message.text = text;
}

// 4. To speak the text
function speakText() {
    speechSynthesis.speak(message);
}

// 5. Function to set the new voice
function setVoice(e) {
    console.log(e.target.value);
    message.voice = voicesBackup.find(voice => voice.name === e.target.value);
}

// Execute populateVoiceList function
populateVoiceList();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

// Event Listeners
// 1. Toggle Button
toggleBtn.addEventListener('click', () => {

    customTextDiv.classList.toggle('show');
})

// 2. Close Button in Custom Text Div
closeBtn.addEventListener('click', () => {
    customTextDiv.classList.remove('show');

})

// 3. Event Listener when changing voices
speechSynthesis.addEventListener('voiceschanged', populateVoiceList);
voiceSelect.addEventListener('change', setVoice);

// 4. Event Listener for custom text reader
readBtn.addEventListener('click', () => {
    setMessage(customText.value);
    speakText();
})