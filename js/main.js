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

// EmailJS 설정 — 아래 세 값을 EmailJS 계정에서 발급받은 값으로 교체하세요
const EMAILJS_PUBLIC_KEY  = 'wVE2oA1EEynHSYlDe';
const EMAILJS_SERVICE_ID  = 'service_studioleo';
const EMAILJS_TEMPLATE_ID = 'template_qy9j8ib';

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

// Contact form handler
const contactForm    = document.getElementById('contactForm');
const submitBtn      = contactForm ? contactForm.querySelector('.form-submit') : null;
const alertModal     = document.getElementById('alertModal');
const alertModalMsg  = document.getElementById('alertModalMsg');
const alertModalClose = document.getElementById('alertModalClose');

function showAlert(msg) {
  alertModalMsg.textContent = msg;
  alertModal.hidden = false;
}

if (alertModalClose) {
  alertModalClose.addEventListener('click', () => {
    alertModal.hidden = true;
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const name    = contactForm.querySelector('#name').value.trim();
    const email   = contactForm.querySelector('#email').value.trim();
    const message = contactForm.querySelector('#message').value.trim();

    submitBtn.disabled    = true;
    submitBtn.textContent = '전송 중...';

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name:  name,
      from_email: email,
      message:    message,
    })
    .then(() => {
      contactForm.reset();
      showAlert('문의가 성공적으로 전송되었습니다.\n빠른 시일 내에 연락드리겠습니다. 감사합니다.');
    })
    .catch(err => {
      console.error('EmailJS error:', err);
      showAlert('전송에 실패했습니다.\n잠시 후 다시 시도하거나\nstudio_leo@naver.com으로 직접 연락해 주세요.');
    })
    .finally(() => {
      submitBtn.disabled    = false;
      submitBtn.textContent = '프로젝트 문의 보내기';
    });
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
