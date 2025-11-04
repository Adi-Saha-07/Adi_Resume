document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });
});



//download CV



// ==========================
// READ MORE BUTTON HANDLER
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const readMoreBtn = document.getElementById("readMoreBtn");
  const moreText = document.getElementById("moreText");

  // Exit if elements are missing (prevents JS breaking other code)
  if (!readMoreBtn || !moreText) return;

  readMoreBtn.addEventListener("click", () => {
    const isVisible = moreText.classList.contains("show-text");

    if (isVisible) {
      moreText.classList.remove("show-text");
      setTimeout(() => (moreText.style.display = "none"), 5);
      readMoreBtn.textContent = "Read More";
    } else {
      moreText.style.display = "block";
      setTimeout(() => moreText.classList.add("show-text"), 5);
      readMoreBtn.textContent = "Read Less";
    }
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
