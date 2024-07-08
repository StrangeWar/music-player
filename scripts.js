// scripts.js
const playPauseButton = document.getElementById('play-pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const volumeControl = document.getElementById('volume');
const progressBar = document.getElementById('progress');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const albumArt = document.getElementById('album-art');

const tracks = [
    {
        title: 'Nagin Dance',
        artist: 'Anmol Malik',
        src: 'track1.mp3',
        albumArt: 'album1.jpg'
    },
    {
        title: 'One Two Three Four ',
        artist: 'Vishal Dadlani, Hamsika Iyer',
        src: 'track2.mp3',
        albumArt: 'album2.jpg'
    },

];

let currentTrackIndex = 0;
let isPlaying = false;
const audio = new Audio();

function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    albumArt.src = track.albumArt;
    audio.load();
}

function playPause() {
    if (isPlaying) {
        audio.pause();
        playPauseButton.textContent = 'Play';
    } else {
        audio.play();
        playPauseButton.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) audio.play();
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) audio.play();
}

function updateProgress() {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
}

function setProgress() {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
}

function setVolume() {
    audio.volume = volumeControl.value;
}

playPauseButton.addEventListener('click', playPause);
nextButton.addEventListener('click', nextTrack);
prevButton.addEventListener('click', prevTrack);
audio.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('input', setProgress);
volumeControl.addEventListener('input', setVolume);

loadTrack(currentTrackIndex);
