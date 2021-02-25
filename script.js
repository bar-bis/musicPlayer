const music = document.querySelector('audio');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevButton = document.getElementById('prev');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');

//Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: "Electic Chill Machine",
        author: "Artist",
    },
    {
        name: 'jacinto-2',
        displayName: "Seven Nation Army",
        author: "Artist",
    },
    {
        name: 'jacinto-3',
        displayName: "Goodnight, Disco Queen",
        author: "Artist",
    },
    {
        name: 'jacinto-4',
        displayName: "Front Row",
        author: "Artist",
    },
];

// Check if playing
let isPlaying = false;

// Play song
function playSong() {
    isPlaying = true;
    playButton.classList.replace('fa-play-circle', 'fa-pause-circle');
    playButton.setAttribute('title', "Pause");
    music.play();
}

//Pause song
function pauseSong() {
    isPlaying = false;
    playButton.classList.replace('fa-pause-circle', 'fa-play-circle');
    playButton.setAttribute('title', "Play");
    music.pause();
}

// play or pause
playButton.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Uodate DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.author;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}
// Current song
let songIndex = 0;

// Previous song
function prevSong() {
    if (songIndex >= 1) {
        songIndex--;
        loadSong(songs[songIndex]);
        playSong();
    } else {
        songIndex = songs.length;
        playSong();
    }
}

// Next song
function nextSong() {
    if (songIndex >= songs.length-1) {
        songIndex = 0;
        loadSong(songs[songIndex])
        playSong();
    } else {
        songIndex++;
        loadSong(songs[songIndex]);
        playSong();
    }
}

// On load - select first song
loadSong(songs[songIndex]);

//Update Progress Bar
function udpateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime} = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // calculate dispaly for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay switch duration element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }
        // calculate dispaly for current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`};
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

//Set progress bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
    playSong();
}

// event listeners
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
music.addEventListener('timeupdate', udpateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong);