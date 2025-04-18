const songs = [
    { title: "Lemmino - Cipher", url: "assets/muse/songs/LEMMiNO Cipher.mp3" },
    { title: "Ballads at Sunset", url: "assets/muse/songs/Ballads at Sunset.mp3" },
    { title: "Camelia", url: "assets/muse/songs/Camelia.mp3" },


    { title: "Cordelia", url: "assets/muse/songs/Cordelia.mp3" },
    { title: "Ethereal", url: "assets/muse/songs/Ethereal.mp3" },
    { title: "Hotine Bling", url: "assets/muse/songs/Hotline Bling.mp3" },


    { title: "Idea 1", url: "assets/muse/songs/Idea 1.mp3" },
    { title: "Idea 7", url: "assets/muse/songs/Idea 7.mp3" },
    { title: "Idea 10", url: "assets/muse/songs/Idea 9.mp3" },


    { title: "Idea 15", url: "assets/muse/songs/Idea 15.mp3" },
    { title: "Idea 20", url: "assets/muse/songs/Idea 20.mp3" },
    { title: "Idea 22", url: "assets/muse/songs/Idea 22.mp3" },


    { title: "Idea 25", url: "assets/muse/songs/Idea 25.mp3" },
    { title: "Idk", url: "assets/muse/songs/idk.mp3" },
    { title: "Îles", url: "assets/muse/songs/Îles.mp3" },


    { title: "Just Give Me One More Day", url: "assets/muse/songs/Just Give Me One More Day.mp3" },
    { title: "Ofelia.", url: "assets/muse/songs/Ofelia.mp3" },
    { title: "Pacifica", url: "assets/muse/songs/Pacifica.mp3" },

    { title: "Solas", url: "assets/muse/songs/Solas.mp3" },
];

let currentIndex = 0;
let isShuffle = false;
let isRepeat = false;
let allSongsPlayed = false;

const audio = document.querySelector("audio");
const source = audio.querySelector("source");
const playbackBtn = document.getElementById("playback");
const playImg = document.getElementById("muse_playback");
const progressBar = document.querySelector(".muse_runner");
const progressInner = document.getElementById("muse_runner_inner");
const nowPlayingImg = document.querySelector(".now_playing img");
const playingTitle = document.getElementById("playing_title").querySelector("p");
const playingTitleContainer = document.getElementById("playing_title");
const footer = document.querySelector("footer");

function loadSong(index) {
    source.src = songs[index].url;
    audio.load();
    playImg.src = "assets/muse/play.gif"; // Ensure the play button starts with play.gif
    playingTitle.textContent = `Now playing: ${songs[index].title}`; // Update title
    playingTitleContainer.classList.add("shrink"); // Shrink title initially
    nowPlayingImg.classList.remove("playing", "stopping"); // Reset disk animation
    allSongsPlayed = false; // Reset all songs played flag
}

function toggleaudio() {
    if (audio.paused) {
        playImg.src = "assets/muse/play_to_pause.gif";
        audio.play();
        playImg.src = "assets/muse/pause.gif";
        nowPlayingImg.classList.add("playing"); // Start spinning
        nowPlayingImg.classList.remove("stopping"); // Remove stopping animation
        playingTitleContainer.classList.add("extend"); // Extend title
        playingTitleContainer.classList.remove("shrink"); // Ensure it is not shrinking
        playingTitleContainer.style.display = "block"; // Ensure title is visible
    } else {
        playImg.src = "assets/muse/pause_to_play.gif";
        audio.pause();
        playImg.src = "assets/muse/play.gif";
        nowPlayingImg.classList.remove("playing"); // Stop spinning
        nowPlayingImg.classList.add("stopping"); // Slow stop animation
        playingTitleContainer.classList.add("shrink"); // Shrink title
        playingTitleContainer.classList.remove("extend"); // Ensure it is not extending
    }
}

// Ensure the title disappears completely after shrinking
playingTitleContainer.addEventListener("transitionend", (e) => {
    if (e.propertyName === "opacity" && playingTitleContainer.classList.contains("shrink")) {
        playingTitleContainer.style.display = "none"; // Hide the title completely
    }
});

function selectnext() {
    if (isShuffle) {
        currentIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentIndex = (currentIndex + 1) % songs.length;
    }

    if (currentIndex === 0 && !isRepeat) {
        allSongsPlayed = true;
        audio.pause();
        playImg.src = "assets/muse/play.gif";
        return;
    }

    loadSong(currentIndex);
    audio.play();
    playImg.src = "assets/muse/pause.gif"; // Ensure playback button shows pause.gif
    nowPlayingImg.classList.add("playing"); // Keep spinning
    nowPlayingImg.classList.remove("stopping"); // Remove stopping animation
    playingTitleContainer.classList.add("extend"); // Extend title
    playingTitleContainer.classList.remove("shrink"); // Ensure it is not shrinking
    playingTitleContainer.style.display = "block"; // Ensure title is visible
}

function selectlast() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;

    loadSong(currentIndex);
    audio.play();
    playImg.src = "assets/muse/pause.gif"; // Ensure playback button shows pause.gif
    nowPlayingImg.classList.add("playing"); // Keep spinning
    nowPlayingImg.classList.remove("stopping"); // Remove stopping animation
    playingTitleContainer.classList.add("extend"); // Extend title
    playingTitleContainer.classList.remove("shrink"); // Ensure it is not shrinking
    playingTitleContainer.style.display = "block"; // Ensure title is visible
}

function shufflesongs() {
    isShuffle = !isShuffle;
    document.getElementById("shufflesong").classList.toggle("active", isShuffle);
}

function repeat() {
    isRepeat = !isRepeat;
    document.getElementById("repeat").classList.toggle("active", isRepeat);
}

// Update progress bar as the song plays
audio.addEventListener("timeupdate", () => {
    const progressPercent = (audio.currentTime / audio.duration) * 98;
    progressInner.style.width = `${progressPercent}%`;
});

// Seek functionality
progressBar.addEventListener("click", (e) => {
    const barWidth = progressBar.offsetWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / barWidth) * duration;
});

// Drag functionality for seeking
let isDragging = false;

progressBar.addEventListener("mousedown", (e) => {
    isDragging = true;
    updateProgress(e);
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        updateProgress(e);
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

function updateProgress(e) {
    const barWidth = progressBar.offsetWidth;
    const barLeft = progressBar.getBoundingClientRect().left;
    const clickX = e.clientX - barLeft;
    const duration = audio.duration;

    if (clickX >= 0 && clickX <= barWidth) {
        const newTime = (clickX / barWidth) * duration;
        audio.currentTime = newTime;
        const progressPercent = (newTime / duration) * 100;
        progressInner.style.width = `${progressPercent}%`;
    }
}

// Auto-play next or repeat on end
audio.addEventListener("ended", () => {
    if (isRepeat) {
        loadSong(currentIndex);
        audio.play();
        nowPlayingImg.classList.add("playing"); // Keep spinning
        playingTitleContainer.classList.remove("shrink"); // Extend title
    } else {
        selectnext();
    }
});

// Toggle footer visibility when the "now playing" image is clicked
nowPlayingImg.addEventListener("click", () => {
    if (footer.classList.contains("visible")) {
        footer.classList.remove("visible"); // Fade out the footer
    } else {
        footer.classList.add("visible"); // Fade in the footer
    }
});

// Initial load
loadSong(currentIndex);

/*----------------------- NEW LINE ----------------- */