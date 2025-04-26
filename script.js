const songs = [
    { title: "Thelema", url: "assets/muse/songs/Thelema.mp3", background: "assets/main/Backgrounds/bk1.jpg", accentColor: "#F71735" },
    { title: "Camelia", url: "assets/muse/songs/Camelia.mp3", background: "assets/main/Backgrounds/bk2.jpg", accentColor: "#8661C1" },
    { title: "Ballads at Sunset", url: "assets/muse/songs/Ballads at Sunset.mp3", background: "assets/main/Backgrounds/bk3.jpg", accentColor: "#FFC300" },

    { title: "Lemmino - Cipher", url: "assets/muse/songs/LEMMiNO Cipher.mp3", background: "assets/main/Backgrounds/bk4.jpg", accentColor: "#9A5979" },
    { title: "Cordelia", url: "assets/muse/songs/Cordelia.mp3", background: "assets/main/Backgrounds/bk5.png", accentColor: "#CCC9A1" },
    { title: "Ethereal", url: "assets/muse/songs/Ethereal.mp3", background: "assets/main/Backgrounds/bk6.jpg", accentColor: "#8FCB9B" },

    { title: "Army Dreamers", url: "assets/muse/songs/Kate Bush - Army Dreamers.mp3", background: "assets/main/Backgrounds/bk7.jpg", accentColor: "#3587A4" },
    { title: "Idea 1", url: "assets/muse/songs/Idea 1.mp3", background: "assets/main/Backgrounds/bk8.jpg", accentColor: "#F19953" },
    { title: "Treehouse", url: "assets/muse/songs/Treehouse - Alex G.mp3", background: "assets/main/Backgrounds/bk9.jpg", accentColor: "#E5D352" },
    
    { title: "Growing Upwards", url: "assets/muse/songs/Himalia - Growing Upwards.mp3", background: "assets/main/Backgrounds/bk10.png", accentColor: "#89A1EF" },
    { title: "Isabella's Lullaby", url: "assets/muse/songs/Isabella's Lullaby.mp3", background: "assets/main/Backgrounds/bk11.jpg", accentColor: "#7FB196" },
    { title: "Comfort Chain", url: "assets/muse/songs/Comfort Chain.mp3", background: "assets/main/Backgrounds/bk12.png", accentColor: "#70A288" },

    { title: "Idea 22", url: "assets/muse/songs/Idea 22.mp3", background: "assets/main/Backgrounds/bk13.jpg", accentColor: "#2660A4" },
    { title: "Idea 25", url: "assets/muse/songs/Idea 25.mp3", background: "assets/main/Backgrounds/bk14.png", accentColor: "#FED9B7" },
    { title: "Idk", url: "assets/muse/songs/idk.mp3", background: "assets/main/Backgrounds/bk15.jpg", accentColor: "#A63D40" },

    { title: "Îles", url: "assets/muse/songs/Îles.mp3", background: "assets/main/Backgrounds/bk16.jpg", accentColor: "#B29EC6" },
    { title: "Just Give Me One More Day", url: "assets/muse/songs/Just Give Me One More Day.mp3", background: "assets/main/Backgrounds/bk17.jpg", accentColor: "#E5B181" },
    { title: "Idea 9", url: "assets/muse/songs/Idea 9.mp3", background: "assets/main/Backgrounds/bk18.jpg", accentColor: "#62B6CB" },
    
    { title: "Solas", url: "assets/muse/songs/Solas.mp3", background: "assets/main/Backgrounds/bk19.png", accentColor: "#FA7E61" },
    { title: "Pacifica", url: "assets/muse/songs/Pacifica.mp3", background: "assets/main/Backgrounds/bk20.jpg", accentColor: "#007090" },
    { title: "Hustle and Bustle of Ormos", url: "assets/muse/songs/Hustle and Bustle of Ormos.mp3", background: "assets/main/Backgrounds/bk21.png", accentColor: "#86CD82" },

    { title: "Greenpath Orchestral Cover", url: "assets/muse/songs/Greenpath Orchestral Cover.mp3", background: "assets/main/Backgrounds/bk22.jpg", accentColor: "#03621A" },
    { title: "Cosmica", url: "assets/muse/songs/Cosmica.mp3", background: "assets/main/Backgrounds/bk23.jpg", accentColor: "#6457A6" },
    { title: "53. The Promise", url: "assets/muse/songs/53. The Promise.mp3", background: "assets/main/Backgrounds/bk24.png", accentColor: "#DE1A1A" },

    { title: "Ofelia", url: "assets/muse/songs/Ofelia.mp3", background: "assets/main/Backgrounds/bk25.jpg", accentColor: "#9ACAEA" },
    { title: "Idea 7", url: "assets/muse/songs/Idea 7.mp3", background: "assets/main/Backgrounds/bk26.jpg", accentColor: "#415D43" },
    { title: "Sarah", url: "assets/muse/songs/alex g - sarah.mp3", background: "assets/main/Backgrounds/bk27.png", accentColor: "#F3B3A6" },
    

    { title: "Imbre", url: "assets/muse/songs/Jordan Critz - Imbre.mp3", background: "assets/main/Backgrounds/bk28.jpg", accentColor: "#464F51" },
    { title: "Flö", url: "assets/muse/songs/Jordan Critz - Flö.mp3", background: "assets/main/Backgrounds/bk29.jpg", accentColor: "#9A031E" },
    { title: "Hotine Bling", url: "assets/muse/songs/Hotline Bling.mp3", background: "assets/main/Backgrounds/bk30.jpg", accentColor: "#749CD0" },
    

];

let currentIndex = 0;
let isShuffle = false;
let isRepeat = false;

const audio = document.querySelector("audio");
const source = audio.querySelector("source");
const playbackBtn = document.getElementById("playback");
const playImg = document.getElementById("muse_playback");
const progressBar = document.querySelector(".music_bar");
const progressInner = document.getElementById("music_bar_progress");
const nowPlayingImg = document.querySelector("#music_toggle img");
const playingTitle = document.getElementById("music_title").querySelector("p");
const playingTitleContainer = document.getElementById("music_title");
const Muse2 = document.querySelector(".Muse2");

const shuffleButton = document.getElementById("shufflesong");
const repeatButton = document.getElementById("repeat");
const shuffleImg = shuffleButton.querySelector("img");
const repeatImg = repeatButton.querySelector("img");

// Select the background image elements
const bgOverlay = document.getElementById("bg_overlay");
const bgOverlay2 = document.getElementById("bg_overlay2");

// Function to update the background based on the current song
function updateBackground() {
    const currentSong = songs[currentIndex];

    // Fade out the current background
    bgOverlay2.style.opacity = "0";

    // Wait for the fade-out transition to complete before changing the background image
    setTimeout(() => {
        bgOverlay2.style.backgroundImage = `url('${currentSong.background}')`;

        // Fade in the new background
        bgOverlay2.style.opacity = "1";
    }, 1000); // Match the CSS transition duration (1s)

    // Smoothly transition the accent color
    transitionAccentColor(
        getComputedStyle(document.documentElement).getPropertyValue("--accent-color").trim(),
        currentSong.accentColor,
        1000 // Match the background transition duration (1s)
    );
}

// Function to load a song
function loadSong(index) {
    source.src = songs[index].url;
    audio.load();
    playImg.src = "assets/muse/play.gif";

    // Update the song title with the new class
    playingTitle.innerHTML = `Now playing: <span class="now-playing-title">${songs[index].title}</span>`;
    playingTitleContainer.classList.add("shrink");
    nowPlayingImg.classList.remove("playing", "stopping");
    updateBackground(); // Update the background
}

function toggleaudio() {
    if (audio.paused) {
        playImg.src = "assets/muse/play_to_pause.gif";
        audio.play();
        playImg.src = "assets/muse/pause.gif";
        nowPlayingImg.classList.add("playing");
        nowPlayingImg.classList.remove("stopping");
        playingTitleContainer.classList.add("extend");
        playingTitleContainer.classList.remove("shrink");
        playingTitleContainer.style.display = "block";
    } else {
        playImg.src = "assets/muse/pause_to_play.gif";
        audio.pause();
        playImg.src = "assets/muse/play.gif";
        nowPlayingImg.classList.remove("playing");
        nowPlayingImg.classList.add("stopping");
        playingTitleContainer.classList.add("shrink");
        playingTitleContainer.classList.remove("extend");
    }
}

// Ensure the title disappears completely after shrinking
playingTitleContainer.addEventListener("transitionend", (e) => {
    if (e.propertyName === "opacity" && playingTitleContainer.classList.contains("shrink")) {
        playingTitleContainer.style.display = "none";
    }
});

// Function to play the next song
function selectnext() {
    let previousIndex = currentIndex;

  

    if (isShuffle) {
        do {
            currentIndex = Math.floor(Math.random() * songs.length);
        } while (currentIndex === previousIndex); // Ensure the same song doesn't play consecutively
    } else {
        currentIndex = (currentIndex + 1) % songs.length;
    }

    loadSong(currentIndex);
    audio.play();
    playImg.src = "assets/muse/pause.gif";
    nowPlayingImg.classList.add("playing");
    nowPlayingImg.classList.remove("stopping");
    playingTitleContainer.classList.add("extend");
    playingTitleContainer.classList.remove("shrink");
    playingTitleContainer.style.display = "block";

   
}

// Function to play the previous song
function selectlast() {
   

    // Navigate to the previous song
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;

    // Load the new song
    loadSong(currentIndex);

    // Play the new song
    audio.play();

    // Update the UI to reflect the playing state
    playImg.src = "assets/muse/pause.gif";
    nowPlayingImg.classList.add("playing");
    nowPlayingImg.classList.remove("stopping");
    playingTitleContainer.classList.add("extend");
    playingTitleContainer.classList.remove("shrink");
    playingTitleContainer.style.display = "block";

 
}

// Function to toggle shuffle
function shufflesongs() {
    isShuffle = !isShuffle;

    if (isShuffle) {
        shuffleImg.src = "assets/muse/shuffle.gif";
        createTooltip(shuffleButton, "Shuffle: On");
    } else {
        shuffleImg.src = "assets/muse/notshuffle.gif";
        createTooltip(shuffleButton, "Shuffle: Off");
    }
}

// Function to toggle repeat
function repeat() {
    isRepeat = !isRepeat;

    if (isRepeat) {
        repeatImg.src = "assets/muse/repeat.gif";
        createTooltip(repeatButton, "Repeat: On");
    } else {
        repeatImg.src = "assets/muse/norepeat.gif";
        createTooltip(repeatButton, "Repeat: Off");
    }
}

// Update progress bar
audio.addEventListener("timeupdate", () => {
    const progressPercent = (audio.currentTime / audio.duration) * 98;
    progressInner.style.width = `${progressPercent}%`;
});

// Seek
progressBar.addEventListener("click", (e) => {
    const barWidth = progressBar.offsetWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / barWidth) * duration;
});

// Event listener for audio ending
audio.addEventListener("ended", () => {
    if (isRepeat) {
        loadSong(currentIndex);
        audio.play();
        nowPlayingImg.classList.add("playing");
        playingTitleContainer.classList.remove("shrink");
    } else {
        selectnext();
    }
});

// visibility for "now playing" image
nowPlayingImg.addEventListener("click", () => {
    if (Muse2.classList.contains("visible")) {
        Muse2.classList.remove("visible"); 
    } else {
        Muse2.classList.add("visible"); 
    }
});

// Select navigation buttons and pages
const navHome = document.getElementById("nav_home");
const navAbout = document.getElementById("nav_about");
const navProjects = document.getElementById("nav_projects");

const homePage = document.querySelector(".Home");
const aboutPage = document.querySelector(".About");
const projectsPage = document.querySelector(".Projects");

// Function to switch pages
function switchPage(targetPage) {
    // Hide all pages
    [homePage, aboutPage, projectsPage].forEach((page) => {
        if (page.classList.contains("active")) {
            page.classList.remove("active");
            page.classList.add("hidden");
        }
    });

    // Show the target page
    targetPage.classList.remove("hidden");
    targetPage.classList.add("active");
}

// Event listeners for navigation buttons
navHome.addEventListener("click", () => switchPage(homePage));
navAbout.addEventListener("click", () => switchPage(aboutPage));
navProjects.addEventListener("click", () => switchPage(projectsPage));

// Set the Home page as the default
document.addEventListener("DOMContentLoaded", () => {
    homePage.classList.add("active");
});

// Toggle contact element
const contactImg = document.getElementById("contact_toggle");
const contactElement = document.querySelector(".Contact");
const socialsContainer = document.querySelector(".Contact .socials");

contactImg.addEventListener("click", () => {
    if (contactElement.classList.contains("visible")) {
        contactElement.classList.remove("visible"); 
        socialsContainer.style.visibility = "hidden"; 
        socialsContainer.style.opacity = "0"; 
    } else {
        contactElement.classList.add("visible"); 
        socialsContainer.style.visibility = "visible"; 
        socialsContainer.style.opacity = "1"; 
    }
});

// create a tooltip
function createTooltip(element, text, position = "right") {
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = text;
    document.body.appendChild(tooltip);

    // Position the tooltip near the element
    element.addEventListener("mousemove", (e) => {
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let left = e.pageX + 10;
        let top = e.pageY + 10;

        if (left + tooltipWidth > viewportWidth) {
            left = e.pageX - tooltipWidth - 10; 
        }

        if (top + tooltipHeight > viewportHeight) {
            top = e.pageY - tooltipHeight - 10; 
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    });

    // Show the tooltip on hover
    element.addEventListener("mouseenter", () => {
        tooltip.style.display = "block";
    });

    // Hide the tooltip when not hovering
    element.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
    });
}

// Add tooltips
const navButtons = document.querySelectorAll(".Nav_links button");
navButtons.forEach((button, index) => {
    const buttonNames = ["Home", "About", "Projects"];
    createTooltip(button, buttonNames[index]);
});

const musicToggle = document.querySelector("#music_toggle img");

// Tooltip for contact image
createTooltip(contactImg, "Contact", "left");

// Tooltip for music toggle disk
createTooltip(musicToggle, "Music Toggle");

// Add tooltips to the social links
const socialLinks = document.querySelectorAll(".socials_links");
const socialTooltips = ["Email", "Telephone", "GitHub", "Social Media"];

socialLinks.forEach((link, index) => {
    createTooltip(link, socialTooltips[index], "left");
});

const projectLinks = document.querySelectorAll(".p_links img");
const projectTooltips = ["Logic", "Art", "Written"];

projectLinks.forEach((link, index) => {
    createTooltip(link, projectTooltips[index]);
});

// Add tooltips for shuffle and repeat buttons
createTooltip(shuffleButton, "Shuffle: Off");
createTooltip(repeatButton, "Repeat: Off");

loadSong(currentIndex);


// Function to smoothly transition the accent color
function transitionAccentColor(startColor, endColor, duration) {
    const stepTime = 10; 
    const steps = duration / stepTime;
    let currentStep = 0;

    const startRGB = hexToRGB(startColor);
    const endRGB = hexToRGB(endColor);

    const stepChange = {
        r: (endRGB.r - startRGB.r) / steps,
        g: (endRGB.g - startRGB.g) / steps,
        b: (endRGB.b - startRGB.b) / steps,
    };

    const interval = setInterval(() => {
        if (currentStep >= steps) {
            clearInterval(interval);
            return;
        }

        const newColor = `rgb(${Math.round(startRGB.r + stepChange.r * currentStep)}, ${Math.round(
            startRGB.g + stepChange.g * currentStep
        )}, ${Math.round(startRGB.b + stepChange.b * currentStep)})`;

        document.documentElement.style.setProperty("--accent-color", newColor);
        currentStep++;
    }, stepTime);
}

// Helper function to convert HEX to RGB
function hexToRGB(hex) {
    const bigint = parseInt(hex.replace("#", ""), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
    };
}
