// Get Elements from DOM
const musicContainer = document.getElementById('music-container');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress');
const platButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const audioButton = document.getElementById('audio');
const prevButton = document.getElementById('prev');
const imgCover = document.getElementById('cover');
const title = document.getElementById('title');
const volumeButton = document.getElementById('volume');
const dropDownButton = document.getElementById('drop-down');
const songListButton = document.getElementById('song-list');
const songsContainer = document.getElementById('songs');

// List of Songs
const songList = ['Bonnie-Tyler-Total-Eclipse-of-the-Heart',
    'Cline-Dion-Im-Alive'
];
console.log(songList);

// Track which song is currently playing
let currentSong = 1;

// Update the song to the DOM
function loadSong(song) {
    // console.log(song);
    title.innerText = song;
    audioButton.src = `music/${song}.mp3`;
    imgCover.src = `images/images.jpeg`;
}

// Initial song Load
loadSong(songList[currentSong]);

// Function to play music and change play button to pause
function musicPlay() {
    musicContainer.classList.add('play');
    platButton.querySelector('i.fas').classList.remove('fa-play');
    platButton.querySelector('i.fas').classList.add('fa-pause');

    // bulltin to play music
    audioButton.play();
}

// Function to pause music and change button to play
function musicPause() {
    musicContainer.classList.remove('play');
    platButton.querySelector('i.fas').classList.remove('fa-pause');
    platButton.querySelector('i.fas').classList.add('fa-play');

    audioButton.pause();
}

//Function to Switch to Previous Song
function prevSong() {
    currentSong--;

    if (currentSong < 0) {
        currentSong = songList.length - 1;
    }

    loadSong(songList[currentSong]);
    musicPlay();
}

// Function to Switch to Next Song
function nextSong() {
    currentSong++;

    if (currentSong > songList.length - 1) {
        currentSong = 0;
    }

    loadSong(songList[currentSong]);
    musicPlay();
}

// Function to update the Progress Bar
function updateProgress(e) {
    const { currentTime, duration } = e.srcElement;
    const progressPercentage = (currentTime / duration) * 100;
    // console.log(currentTime, duration);
    // displaying progress bar 
    progressBar.style.width = `${progressPercentage}%`;
    // console.log(progressPercentage);
}

// Function to set the Progress bar at click
function setProgress(e) {
    //  variable to store full width of progress bar
    const width = this.clientWidth;
    // variable to store the time at click using offsetX
    const offsetX = e.offsetX;
    // actual duration of song
    const duration = audioButton.duration;
    // get the duration or time in percentage
    audioButton.currentTime = (offsetX / width) * duration;
    // console.log(offsetX, width);
}

// Funtion to adjust volume
function volumeControl() {
    audioButton.volume = audioButton.volume === 1 ? 0 : audioButton.volume === 0 ? 0.2 : 1;
    const icon = audioButton.volume === 1 ? 'volume-up' : audioButton.volume === 0 ? 'volume-off' : 'volume-down';
    volumeButton.querySelector('i.fas').className = `fas fa-${icon}`;



    // audio.volume = audio.volume === 1 ? 0 : audio.volume === 0 ? 0.5 : 1;
    // const icon = audio.volume === 1 ? 'volume-up' : audio.volume === 0 ? 'volume-off' : 'volume-down';
    // volumeButton.querySelector('i.fas').className = `fas fa-${icon}`;

}

// 1 - Function to show songs list on clicking drop down button
function showSongList() {
    songListButton.classList.toggle('show');
    dropDownButton.classList.toggle('rotate');
    songsContainer.innerHTML = `<h4>All Songs</h4>`
    songList.forEach(song => {

        songsContainer.innerHTML += `
        <li class="song" id="${songList.indexOf(song)}"><img src="images/images.jpeg" alt="thumbnail" class="thumbnail"><p>${song}</p></li>
        `
    })
    songsContainer.scrollIntoView();
}

// 9 - Function to remove interrupt in changging song
function goWithTheFlow() {
    if (!audio.paused) {
        pauseSong();
        loadSong(allSongs[currentSong]);
        playSong();
    } else {
        loadSong(allSongs[currentSong]);
    }
}

// ..........Event Listeners.........................//
// 1. Play Button to play music
platButton.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        musicPause();
    } else {
        musicPlay();
    }
});

// 2. Previous Button Event Listener
prevButton.addEventListener('click', prevSong);


// 3. Next Button Event Listener
nextButton.addEventListener('click', nextSong);

// 3. Update the time for song play
audioButton.addEventListener('timeupdate', updateProgress);

// 4. Update the time for song at click on progress bar
progressContainer.addEventListener('click', setProgress);

// 5. Automatically play next song
audioButton.addEventListener('ended', nextSong);

// 6. Volume adjustment
volumeButton.addEventListener('click', volumeControl);


dropDownButton.addEventListener('click', showSongList);

songListButton.addEventListener('click', showSongList);


// 6 - Event listener to play selected song
window.addEventListener('click', e => {
    if (e.target.className == 'song') {
        const songID = +e.path.filter(element => element.className === 'song')[0].id;
        currentSong = songID;
        // goWithTheFlow();

        loadSong(songList[currentSong]);
        musicPlay();
        document.body.scrollIntoView();
    }
})