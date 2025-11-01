document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });
});

const canvas = document.getElementById("matrixRain");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "アカサタナハマヤラワ0123456789カキクケコシスセソタチツテトニヌネノ";
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);

const drops = Array.from({ length: columns }, () => Math.random() * -50);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const opacity = Math.random() * 0.8 + 0.2; 
    ctx.fillStyle = `rgba(255,255,255, ${opacity})`;

    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height * 0.5 && Math.random() > 0.98) {
      drops[i] = Math.random() * -20;
    }

    drops[i] += 0.2;
  }
}

setInterval(drawMatrix, 60);

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
