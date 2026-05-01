const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const title = document.getElementById("title");
const coverImg = document.getElementById("coverImg");

const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

let songs = [
    { name: "Sunkissed Lola", path: "songs/Pasilyo.mp3", img: "assetss/lola.png" },
    { name: "Bad example", path: "songs/takayan.mp3", img: "assetss/takayan.png" }
];

let currentSong = 0;

/* 🔥 Load song */
function loadSong(index) {
    audio.src = songs[index].path;
    title.innerText = songs[index].name;
    coverImg.src = songs[index].img;

    audio.pause();                     // reset state
    audio.currentTime = 0;

    playBtn.src = "assetss/pause.png";  // always show play initially
}

/* 🔥 Play / Pause toggle */
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

/* 🔥 Sync button with REAL audio state */
audio.addEventListener("play", () => {
    playBtn.src = "assetss/play.png";
});

audio.addEventListener("pause", () => {
    playBtn.src = "assetss/pause.png";
});

/* 🔥 Next song */
nextBtn.addEventListener("click", () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
});

/* 🔥 Previous song */
prevBtn.addEventListener("click", () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
});

/* 🔥 Auto next */
audio.addEventListener("ended", () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
});

/* 🔥 Format time */
function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (seconds < 10) seconds = "0" + seconds;
    return `${minutes}:${seconds}`;
}

/* 🔥 Update progress bar */
audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;

    let progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

/* 🔥 Seek */
progress.addEventListener("input", () => {
    if (!audio.duration) return;

    let seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

/* 🔥 Initial load */
loadSong(currentSong);