/* =========================================
   AdyVerse Portfolio JavaScript
   ========================================= */

//scroll bar


// popup
const profileImg = document.getElementById("profile-img");
const popup = document.getElementById("profilePopup");
const closeBtn = document.querySelector(".close-popup");

profileImg.addEventListener("click", () => {
    popup.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    popup.classList.remove("active");
});

popup.addEventListener("click", (e) => {
    if(e.target === popup){
        popup.classList.remove("active");
    }
});



// --- Preloader ---
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500); // fully remove from flow
        
        // Trigger initial reveal animations after preloader
        reveal();
    }, 1000); // Reduced to 1 second for a snappier load
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    hidePreloader();
} else {
    document.addEventListener('DOMContentLoaded', hidePreloader);
    window.addEventListener('load', hidePreloader); // fallback
}


// --- Navigation Toggle (Mobile) ---
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Remove menu on link click
const navLinks = document.querySelectorAll('.nav-link');
const linkAction = () => {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

// --- Sticky Header ---
const scrollHeader = () => {
    const header = document.getElementById('header');
    if(window.scrollY >= 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
}
window.addEventListener('scroll', scrollHeader);

// --- Active Link on Scroll ---
const sections = document.querySelectorAll('section[id]');
const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 100,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

        if(sectionsClass) {
            if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active');
            } else {
                sectionsClass.classList.remove('active');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

// --- Skills Tabs ---
const tabs = document.querySelectorAll('.skills-tab'),
      groups = document.querySelectorAll('.skills-group');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);
        
        // Remove active class from all groups and tabs
        groups.forEach(group => group.classList.remove('active'));
        tabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding group
        tab.classList.add('active');
        target.classList.add('active');
    });
});

// --- Scroll Reveal Animations ---
function reveal() {
    const reveals = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-scale, .reveal-slide-left, .reveal-slide-right');
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}
window.addEventListener('scroll', reveal);

// --- Contact Form Submission (Mock) ---
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would normally handle the form submission (e.g., via Fetch API to Formspree)
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = 'Message Sent <i class="fas fa-check"></i>';
        btn.style.background = 'linear-gradient(135deg, #00ff88, #00cc66)';
        
        setTimeout(() => {
            contactForm.reset();
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 3000);
    });
}

// --- Footer Year ---
const yearSpan = document.getElementById('year');
if(yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
