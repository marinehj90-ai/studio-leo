// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu if open
    document.getElementById('nav').classList.remove('open');
    document.getElementById('menuToggle').classList.remove('active');
  });
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  menuToggle.classList.toggle('active');
});

// Contact form handler
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    contactForm.hidden = true;
    formSuccess.hidden = false;
  });
}

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

// Video showcase play button
const showcasePlayBtn = document.getElementById('showcasePlayBtn');
const showcaseVideo = document.querySelector('.showcase-video');

if (showcasePlayBtn && showcaseVideo) {
  showcasePlayBtn.addEventListener('click', () => {
    if (showcaseVideo.muted) {
      showcaseVideo.muted = false;
      showcaseVideo.currentTime = 0;
      showcasePlayBtn.querySelector('span').textContent = 'MUTE';
    } else {
      showcaseVideo.muted = true;
      showcasePlayBtn.querySelector('span').textContent = 'PLAY';
    }
  });
}

// Header background on scroll
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
