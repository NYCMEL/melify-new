// ── Theme toggle ──────────────────────────────────────────────────────────────
const html      = document.documentElement;
const themeBtn  = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const MOON = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;
const SUN  = `<circle cx="12" cy="12" r="5"/>
  <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`;

function setTheme(light) {
  html.classList.toggle('light', light);
  themeIcon.innerHTML = light ? MOON : SUN;
  localStorage.setItem('melify-theme', light ? 'light' : 'dark');
}

// Apply saved preference — falls back to system preference
const saved      = localStorage.getItem('melify-theme');
const preferLight = saved
  ? saved === 'light'
  : window.matchMedia('(prefers-color-scheme: light)').matches;
setTheme(preferLight);

themeBtn.addEventListener('click', () => {
  setTheme(!html.classList.contains('light'));
});

// ── Nav scroll effect ──────────────────────────────────────────────────────────
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Scroll reveal ──────────────────────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ── Component pill interactions ────────────────────────────────────────────────
document.querySelectorAll('.component-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    pill.style.background   = 'rgba(37,99,235,0.12)';
    pill.style.borderColor  = 'rgba(37,99,235,0.4)';
    pill.style.color        = '#93bbfc';
    setTimeout(() => {
      pill.style.background  = '';
      pill.style.borderColor = '';
      pill.style.color       = '';
    }, 600);
  });
});

// ── Smooth scroll for anchor links ────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
