document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });
});



//photo pop up 
document.addEventListener("DOMContentLoaded", () => {
  const profilePic = document.getElementById("profilePic");
  const popup = document.getElementById("greetingPopup");
  const closePopup = document.getElementById("closePopup");

  if (!profilePic || !popup || !closePopup) {
    console.error("Popup elements missing.");
    return;
  }

  // Show popup
  profilePic.addEventListener("click", () => {
    popup.style.display = "flex";
  });

  // Close popup
  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Click outside popup to close
  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.style.display = "none";
  });

  // Optional: ESC key closes popup
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") popup.style.display = "none";
  });
});




/*Backgroud effect*/
const canvas = document.getElementById("matrixRain");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Mobile check
const isMobile = window.innerWidth <= 850;

// Particle setup
const particles = [];
const total = 400;
const depth = 1000;
let mouseX = 0, mouseY = 0;

for (let i = 0; i < total; i++) {
  particles.push({
    x: (Math.random() - 0.5) * depth,
    y: (Math.random() - 0.5) * depth,
    z: Math.random() * depth,
  });
}

// Mouse movement (desktop only)
if (!isMobile) {
  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / 50;
    mouseY = (e.clientY - window.innerHeight / 2) / 50;
  });
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let p of particles) {
    p.z -= 2; // speed
    if (p.z <= 0) {
      p.z = depth;
      p.x = (Math.random() - 0.5) * depth;
      p.y = (Math.random() - 0.5) * depth;
    }

    const scale = 300 / p.z;
    // Apply mouse shift only on desktop
    const x2d = p.x * scale + canvas.width / 2 + (isMobile ? 0 : mouseX);
    const y2d = p.y * scale + canvas.height / 2 + (isMobile ? 0 : mouseY);

    const size = Math.max(0, 2 - p.z / 400);
    const brightness = 1 - p.z / depth;

    ctx.beginPath();
    ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${brightness})`;
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

draw();







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

