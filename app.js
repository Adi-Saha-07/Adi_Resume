document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });
});



const canvas = document.getElementById("matrixRain");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Characters to display
const letters = "アカサタナハマヤラワカキクケコシスセソタチツテトニヌネノ";

// Configuration
const flakes = [];
const baseFont = 18;
const maxFlakes = 120;

// Initialize flakes
for (let i = 0; i < maxFlakes; i++) {
  flakes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speed: 0.12 + Math.random() * 0.4,
    char: letters.charAt(Math.floor(Math.random() * letters.length)),
    size: baseFont + Math.random() * 4,
    opacity: 0.35 + Math.random() * 0.45,
    fading: false // new property to control fade
  });
}

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < flakes.length; i++) {
    const f = flakes[i];
   ctx.fillStyle = `rgba(255,255,255, ${f.opacity})`;// soft red color
    ctx.font = `${f.size}px monospace`;
    ctx.fillText(f.char, f.x, f.y);

    f.y += f.speed;

    const stopY = canvas.height * 0.5;

    // Start fading near the halfway point
    if (f.y > stopY * 0.9 && !f.fading) {
      f.fading = true;
    }

    // Handle fading animation
    if (f.fading) {
      f.opacity -= 0.01; // decrease opacity slowly
      if (f.opacity <= 0) {
        // reset once fully faded
        f.y = -10 - Math.random() * 60;
        f.x = Math.random() * canvas.width;
        f.char = letters.charAt(Math.floor(Math.random() * letters.length));
        f.speed = 0.12 + Math.random() * 0.4;
        f.size = baseFont + Math.random() * 4;
        f.opacity = 0.35 + Math.random() * 0.45;
        f.fading = false;
      }
    }
  }

  requestAnimationFrame(draw);
}


requestAnimationFrame(draw); 




window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const preloader = document.getElementById("preloader");

preloader.style.display = "none";

let loaderShown = false;

const slowNetworkTimer = setTimeout(() => {
  if (document.readyState !== "complete") {
    preloader.style.display = "flex";
    loaderShown = true;
  }
}, 1500);

window.addEventListener("load", () => {
  clearTimeout(slowNetworkTimer);

  if (loaderShown) {

    preloader.classList.add("hide");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 600);
  } else {

    preloader.style.display = "none";
  }
});

window.addEventListener("load", () => {
  const intro = document.getElementById("intro-popup");
  const typeText = document.getElementById("intro-type");

  const lines = [
    "Loading...",
    "Welcome to AdyVerse "
  ];

  let lineIndex = 0;
  let charIndex = 0;

  function typeEffect() {
    if (lineIndex < lines.length) {
      const currentLine = lines[lineIndex];

      if (charIndex < currentLine.length) {
        typeText.textContent += currentLine.charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 100); 
      } else {

        lineIndex++;
        charIndex = 0;

        if (lineIndex < lines.length) {
          setTimeout(() => {
            typeText.textContent = ""; 
            typeEffect();
          }, 1000); 
        } else {

          setTimeout(() => {
            intro.style.animation = "fadeOutIntro 2s ease forwards";
            setTimeout(() => intro.style.display = "none", 2000);
          }, 1000);
        }
      }
    }
  }

  if (!sessionStorage.getItem("adi_intro_shown")) {
    setTimeout(typeEffect, 800);
    sessionStorage.setItem("adi_intro_shown", "true");
  } else {
    intro.style.display = "none";
  }
});

