const music = document.querySelector('audio');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
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

// event listeners
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);