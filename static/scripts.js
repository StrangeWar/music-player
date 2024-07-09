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
        title: 'Naagin Dance',
        artist: 'Anmol Malik',
        src: 'static/music/track1.mp3',
        albumArt: 'static/images/album1.jpg'
    },
    {
        title: 'one two three four',
        artist: 'Vishal Dadlani',
        src: 'static/music/track2.mp3',
        albumArt: 'static/images/album2.jpg'
    },
    {
        title: 'Nazar',
        artist: 'Imran khan',
        src: 'static/music/track3.mp3'
        
    }
];

const defaultAlbumArt = 'static/images/default.jpeg';

let currentTrackIndex = 0;
let isPlaying = false;
const audio = new Audio();
let spinDegrees = 0;
let lastTimestamp;

function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    albumArt.src = track.albumArt ? track.albumArt : defaultAlbumArt;
    audio.load();
}

function playTrack() {
    audio.play();
    playPauseButton.textContent = 'Pause';
    lastTimestamp = performance.now();
    requestAnimationFrame(animateSpin);
    isPlaying = true;
}

function pauseTrack() {
    audio.pause();
    playPauseButton.textContent = 'Play';
    isPlaying = false;
}

function togglePlayPause() {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) playTrack();
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) playTrack();
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

function animateSpin(timestamp) {
    if (!isPlaying) return;

    const elapsed = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    spinDegrees += (elapsed / 1000) * 72; // Rotate at 72 degrees per second
    albumArt.style.transform = `rotate(${spinDegrees}deg)`;

    requestAnimationFrame(animateSpin);
}

playPauseButton.addEventListener('click', togglePlayPause);
nextButton.addEventListener('click', nextTrack);
prevButton.addEventListener('click', prevTrack);
audio.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('input', setProgress);
volumeControl.addEventListener('input', setVolume);

loadTrack(currentTrackIndex);
