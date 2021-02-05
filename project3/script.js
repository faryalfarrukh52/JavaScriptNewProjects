// Get all Elements from HTML and save them in variable using const

const video = document.getElementById('video');
const play = document.getElementById('play');
const stopvideo = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Functions for all Event Listener

// 1 - togglevideo - Play or Pause video
// If video is playing, then pause it
// If video is pause, then play
function togglevideo() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// 2 - updateIcon - toggle between play and pause icon
// If video is playing, show pause icon
// If video is pause, show play icon
function updateIcon() {
    if (video.paused) {
        play.innerHTML = '<i class="fas fa-play fa-2x"></i>';
    } else {
        play.innerHTML = '<i class="fas fa-pause fa-2x"></i>';
    }
};

// 3 - updateProgress - update the position of progress bar
function updateProgress() {
    progress.value = video.currentTime / video.duration * 100;

    // Update timestamp
    // Rounding down the minutes
    let minutes = Math.floor(video.currentTime / 60);
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    // console.log(video.currentTime + "-" + minutes);

    // Rounding down the seconds
    let seconds = Math.floor(video.currentTime % 60);
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    // console.log(seconds + ":" + video.currentTime);

    // Display Timestamp
    timestamp.innerHTML = `${minutes}:${seconds}`;
};

// 4 - stopVideo - stop video playback and rest time to 0
function stopVideo() {
    video.pause();
    video.currentTime = 0;
};

// 5 - setProgress - update video playback based on manual change in progress bar
function setProgress() {
    video.currentTime = progress.value * video.duration / 100;
}

function timeupdate() {

}




// Event Listeners
// 1 - video Element - click to play or pause video //clickk is event and togglevideo is a function
video.addEventListener('click', togglevideo);

// 2 - Video Element - change video play icon to pause icon
video.addEventListener('pause', updateIcon)

// 3 - Video Element - play to toggle pause icon back to play icon
video.addEventListener('play', updateIcon);

// 4 - Video Element -  update progress bar and timestamp
video.addEventListener('timeupdate', updateProgress);

// 5 - Play Button - click to play or pause video
play.addEventListener('click', togglevideo);

// 6 - Stop Button - click to reset video and pause video
stopvideo.addEventListener('click', stopVideo);

// 7 - Progress Bar - change position to change time of playback
progress.addEventListener('change', setProgress);