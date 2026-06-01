/* ============================================
   WAQAR AHMAD — PORTFOLIO JS
   ============================================ */

'use strict';

const EMAILJS_PUBLIC_KEY  = 'wwVhS6Vx5dGlQZgWf';
const EMAILJS_SERVICE_ID  = 'service_no1u1xd';
const EMAILJS_TEMPLATE_ID = 'template_240dpwc';

/* ---- Init AOS ---- */
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60
});

/* ---- Typed.js ---- */
const typed = new Typed('#typed-text', {
  strings: [
    'ERP Consultant',
    'Odoo Architect',
    'Techno Functional Expert',
    'Python Developer',
    'Solution Architect'
  ],
  typeSpeed: 55,
  backSpeed: 30,
  backDelay: 1800,
  loop: true,
  smartBackspace: true
});

/* ---- Navbar: scroll class + active link ---- */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateNav() {
  // Scroll class
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 90;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* ---- Mobile nav toggle ---- */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navMenu.classList.toggle('open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

/* ---- Smooth scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---- Counter Animation ---- */
function animateCounter(el, target, duration = 1600) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

const statNums = document.querySelectorAll('.stat-num');
let countersStarted = false;

function checkCounters() {
  if (countersStarted) return;
  const statsSection = document.getElementById('stats');
  if (!statsSection) return;
  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    countersStarted = true;
    statNums.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      animateCounter(el, target);
    });
  }
}

window.addEventListener('scroll', checkCounters, { passive: true });
checkCounters();

/* ---- Skill Bars: animate on scroll ---- */
const skillBars = document.querySelectorAll('.skill-bar-fill');
let skillBarsAnimated = false;

function animateSkillBars() {
  if (skillBarsAnimated) return;
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 80) {
    skillBarsAnimated = true;
    skillBars.forEach((bar, i) => {
      const width = bar.getAttribute('data-width');
      setTimeout(() => {
        bar.style.width = width + '%';
      }, i * 60);
    });
  }
}

window.addEventListener('scroll', animateSkillBars, { passive: true });
animateSkillBars();

/* ---- Project Filter ---- */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      const cat = card.getAttribute('data-category');
      if (filter === 'all' || cat === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        requestAnimationFrame(() => {
          card.style.animation = 'filterIn 0.4s ease both';
        });
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Inject filter animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes filterIn {
    from { opacity: 0; transform: translateY(16px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
`;
document.head.appendChild(styleSheet);

/* ---- Testimonials Slider ---- */
const track = document.getElementById('testimonialsTrack');
const dots = document.querySelectorAll('.testi-dot');
const prevBtn = document.getElementById('testiPrev');
const nextBtn = document.getElementById('testiNext');
let currentSlide = 0;
const totalSlides = track ? track.children.length : 0;

function goToSlide(index) {
  if (!track) return;
  currentSlide = (index + totalSlides) % totalSlides;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

// Auto-advance
let autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);
if (track) {
  track.addEventListener('mouseenter', () => clearInterval(autoSlide));
  track.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);
  });
}

// Touch swipe
let touchStartX = 0;
let touchEndX = 0;
if (track) {
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
  }, { passive: true });
}


/* ---- Contact Form ---- */
(function() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const formError   = document.getElementById('formError');

  if (!contactForm) return;

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    if (typeof emailjs === 'undefined') {
      if (formError) formError.classList.add('show');
      btn.innerHTML = originalHTML;
      btn.disabled = false;
      return;
    }

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
      .then(() => {
        if (formSuccess) formSuccess.classList.add('show');
        if (formError) formError.classList.remove('show');
        contactForm.reset();
        btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        btn.disabled = false;
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          if (formSuccess) formSuccess.classList.remove('show');
        }, 5000);
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        if (formError) formError.classList.add('show');
        if (formSuccess) formSuccess.classList.remove('show');
        btn.innerHTML = originalHTML;
        btn.disabled = false;
        setTimeout(() => { if (formError) formError.classList.remove('show'); }, 7000);
      });
  });
})();

/* ---- Particle Canvas ---- */
(function() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); initParticles(); }, { passive: true });

  function randBetween(a, b) { return a + Math.random() * (b - a); }

  function initParticles() {
    particles = [];
    const count = Math.floor((width * height) / 18000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: randBetween(1, 2.5),
        vx: randBetween(-0.18, 0.18),
        vy: randBetween(-0.18, 0.18),
        alpha: randBetween(0.15, 0.5),
        pulse: Math.random() * Math.PI * 2
      });
    }
  }
  initParticles();

  const colors = ['124,58,237', '167,139,250', '59,130,246'];

  function draw() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.012;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
      const c = colors[i % colors.length];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${c},${a})`;
      ctx.fill();

      // Lines between nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x, dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(124,58,237,${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ---- Profile card 3D tilt ---- */
(function() {
  const card = document.querySelector('.profile-card');
  if (!card) return;
  const wrap = card.closest('.profile-card-wrap');
  if (!wrap) return;

  wrap.addEventListener('mousemove', e => {
    const rect = wrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateY(0)`;
    card.style.animation = 'none';
  });

  wrap.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.animation = '';
  });
})();

/* ---- Glow cursor follow on hero ---- */
(function() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const blob3 = hero.querySelector('.blob-3');
    if (blob3) {
      blob3.style.left = x + '%';
      blob3.style.top = y + '%';
    }
  });
})();
