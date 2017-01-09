const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

// play/pause
function toggleVideo() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}
video.addEventListener('click', toggleVideo);
toggle.addEventListener('click', toggleVideo);

function updateButton() {
    if (video.paused) {
        toggle.innerHTML = '🎭';
    } else {
        toggle.innerHTML = '✋';
    }
}
updateButton();
video.addEventListener('pause', updateButton);
video.addEventListener('play', updateButton);

// skip buttons
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}
skipButtons.forEach(e => e.addEventListener('click', skip));

// progress bar
function handleProgress() {
    const pct = video.currentTime / video.duration;
    progressBar.style.flexBasis = (pct * 100).toString() + '%';
}
video.addEventListener('timeupdate', handleProgress);

let scrollOn = false;
function scrubTo(e) {
    if (scrollOn) {
    const pct = e.offsetX / progress.offsetWidth;
    video.currentTime = pct * video.duration;
    }
}
progress.addEventListener('mousedown', () => { scrollOn = true; });
progress.addEventListener('mouseup', () => { scrollOn = false; });
progress.addEventListener('mouseout', () => { scrollOn = false; });
progress.addEventListener('mousemove', scrubTo);
progress.addEventListener('click', scrubTo);

// range slider (volume & speed)
function rangeUpdate() {
    video[this.name] = this.value;
}
ranges.forEach(e => e.addEventListener('change', rangeUpdate));

// fullscreen
function toggleFullscreen() {
    video.classList.toggle('player__video__fullscreen');
}
fullscreen.addEventListener('click', toggleFullscreen);