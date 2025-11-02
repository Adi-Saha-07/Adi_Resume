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



const canvas = document.getElementById("matrixRain");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// ===== CONFIG =====
const stars = [];
const total = 800;
const depth = 1200;
let speed = 1; // ship speed

for (let i = 0; i < total; i++) {
  stars.push({
    x: (Math.random() - 0.5) * depth,
    y: (Math.random() - 0.5) * depth,
    z: Math.random() * depth,
    px: 0,
    py: 0
  });
}

// scroll to control speed
window.addEventListener("wheel", (e) => {
  speed += e.deltaY * -0.02;
  speed = Math.max(2, Math.min(1, speed));
});

// slight mouse-based camera tilt
let tiltX = 0, tiltY = 0, targetX = 0, targetY = 0;
window.addEventListener("mousemove", (e) => {
  targetX = (e.clientX / innerWidth - 0.5) * 0.8;
  targetY = (e.clientY / innerHeight - 0.5) * 0.8;
});

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  tiltX += (targetX - tiltX) * 0.05;
  tiltY += (targetY - tiltY) * 0.05;

  for (let s of stars) {
    s.z -= speed;
    if (s.z <= 0) {
      s.z = depth;
      s.x = (Math.random() - 0.5) * depth;
      s.y = (Math.random() - 0.5) * depth;
      s.px = cx;
      s.py = cy;
    }

    const k = 200 / s.z;
    const x = s.x * k + cx + tiltX * 200;
    const y = s.y * k + cy + tiltY * 200;

    // skip stars behind view
    if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) continue;

    // brightness + color tint
    const brightness = 1 - s.z / depth;
    const r = Math.floor(200 + 55 * brightness);
    const g = Math.floor(200 + 55 * brightness);
    const b = Math.floor(255 * brightness);

    // draw motion trail
    if (s.px !== 0 && s.py !== 0) {
      ctx.strokeStyle = `rgba(${r},${g},${b},${brightness})`;
      ctx.lineWidth = 1.2 + brightness * 1.5;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(s.px, s.py);
      ctx.stroke();
    }

    // store previous position
    s.px = x;
    s.py = y;
  }

  // faint center glow (like ship’s window reflection)
  const radial = ctx.createRadialGradient(cx, cy, 0, cx, cy, 400);
  radial.addColorStop(0, "rgba(255,255,255,0.03)");
  radial.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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

