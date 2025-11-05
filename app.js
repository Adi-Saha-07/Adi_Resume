document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });
});






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



///////////////////////////////////
///////////////////////////////////
//reveal animation/////////////////
///////////////////////////////////
///////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  // Only play intro animation once per load
  if (sessionStorage.getItem("introPlayed")) {
    // Animation already played → skip it completely
    document.querySelectorAll(".photo, .name, .rl, .know")
      .forEach(el => {
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
      });
    return;
  }

  // First-time load animation
  const elements = document.querySelectorAll(".photo, .name, .rl, .know, .education-item");

  // Hide initially
  elements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(40px)";
  });

  // Reveal smoothly, one by one
  elements.forEach((el, i) => {
    setTimeout(() => {
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, 300 + i * 200);
  });

  // Mark that animation has played once
  sessionStorage.setItem("introPlayed", "true");
});








document.addEventListener("DOMContentLoaded", () => {
  const skillBtns = document.querySelectorAll(".skill-btn");
  const skillContents = document.querySelectorAll(".skill-content");

  // Function to show content with animation
  const showSkillContent = (btn, animate = true) => {
    // remove previous actives
    skillBtns.forEach((b) => b.classList.remove("active"));
    skillContents.forEach((c) => {
      c.classList.remove("active");
      c.querySelectorAll("li").forEach((li) => li.classList.remove("show"));
    });

    // activate current button and its content
    btn.classList.add("active");
    const target = document.getElementById(btn.dataset.skill);
    if (target) {
      target.classList.add("active");

      // animate only when switching tabs (not on first load)
      if (animate) {
        const icons = target.querySelectorAll("li");
        icons.forEach((li, i) => {
          setTimeout(() => {
            li.classList.add("show");
          }, i * 120);
        });
      } else {
        // show instantly (no animation)
        target.querySelectorAll("li").forEach((li) => li.classList.add("show"));
      }
    }
  };

  // ✅ On load — show default tab without animation
  const defaultBtn = document.querySelector(".skill-btn.active") || skillBtns[0];
  if (defaultBtn) showSkillContent(defaultBtn, false);

  // ✅ On click — switch tab with animation
  skillBtns.forEach((btn) => {
    btn.addEventListener("click", () => showSkillContent(btn, true));
  });
});
