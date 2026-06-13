/* ═══════════════════════════════════════════
   PORTFOLIO — main.js
   ═══════════════════════════════════════════ */

/* ── CUSTOM CURSOR ───────────────────────── */
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    cursorTrail.style.left = e.clientX + 'px';
    cursorTrail.style.top  = e.clientY + 'px';
  }, 80);
});

/* ── MOBILE SIDEBAR TOGGLE ───────────────── */
const sidebar      = document.getElementById('sidebar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');

mobileMenuBtn?.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});
document.addEventListener('click', e => {
  if (window.innerWidth <= 900 &&
      !sidebar.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)) {
    sidebar.classList.remove('open');
  }
});

/* ── ACTIVE NAV ON SCROLL ────────────────── */
const sections = document.querySelectorAll('.section');
const navLinks  = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const id = entry.target.id;
      document.querySelector(`.nav-link[data-section="${id}"]`)?.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => observer.observe(s));

/* ── SECTION REVEAL ON SCROLL ────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

sections.forEach(s => revealObserver.observe(s));

/* ── SKILL BAR ANIMATION ─────────────────── */
const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const pct  = entry.target.dataset.pct;
      const fill = entry.target.querySelector('.skill-fill');
      if (fill) fill.style.width = pct + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

skillBars.forEach(b => skillObserver.observe(b));

/* ── PROJECT FILTER ──────────────────────── */
const filterBtns    = document.querySelectorAll('.filter-btn');
const projectCards  = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

/* ── ACHIEVEMENTS SYSTEM ─────────────────── */

// Define all achievements here.
// Add/edit as you like!
const ACHIEVEMENTS = [
  { id: 'explorer',  emoji: '🧭', name: 'Explorer',     desc: 'Visited the About section' },
  { id: 'builder',   emoji: '🔨', name: 'Builder',      desc: 'Checked out Projects' },
  { id: 'scholar',   emoji: '📚', name: 'Scholar',      desc: 'Reviewed Skills' },
  { id: 'historian', emoji: '📜', name: 'Historian',    desc: 'Browsed Experience' },
  { id: 'reader',    emoji: '✍️', name: 'Reader',       desc: 'Found the Writing section' },
  { id: 'connector', emoji: '🤝', name: 'Connector',    desc: 'Reached out via Contact' },
];

// Map sections to achievement ids
const SECTION_ACH_MAP = {
  'about':      'explorer',
  'projects':   'builder',
  'skills':     'scholar',
  'experience': 'historian',
  'blog':       'reader',
  'contact':    'connector',
};

let unlockedSet = new Set(JSON.parse(localStorage.getItem('ach_unlocked') || '[]'));

function saveUnlocked() {
  localStorage.setItem('ach_unlocked', JSON.stringify([...unlockedSet]));
}

function renderAchGrid() {
  const grid  = document.getElementById('achGrid');
  const count = document.getElementById('achCount');
  if (!grid) return;

  grid.innerHTML = ACHIEVEMENTS.map(a => `
    <div class="ach-item ${unlockedSet.has(a.id) ? 'unlocked' : ''}" title="${a.desc}">
      <span class="ach-emoji">${a.emoji}</span>
      <span class="ach-name">${a.name}</span>
    </div>
  `).join('');

  count.textContent = `${unlockedSet.size}/${ACHIEVEMENTS.length}`;
}

function showToast(ach) {
  const toast    = document.getElementById('achToast');
  const toastName = document.getElementById('toastName');
  if (!toast || !toastName) return;
  toastName.textContent = `${ach.emoji} ${ach.name}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

function unlockAch(id) {
  if (unlockedSet.has(id)) return;
  const ach = ACHIEVEMENTS.find(a => a.id === id);
  if (!ach) return;
  unlockedSet.add(id);
  saveUnlocked();
  renderAchGrid();
  showToast(ach);
}

// Trigger achievements when sections are visited
const achObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const achId = SECTION_ACH_MAP[entry.target.id];
      if (achId) unlockAch(achId);
    }
  });
}, { threshold: 0.25 });

sections.forEach(s => achObserver.observe(s));

// Achievements toggle panel
const achToggle = document.getElementById('achToggle');
const achPanel  = document.getElementById('achPanel');
achToggle?.addEventListener('click', () => {
  achPanel.classList.toggle('open');
});

renderAchGrid();

/* ── TERMINAL TYPING ANIMATION ───────────── */
// The terminal output already uses CSS for the blinking cursor.
// If you want to add a typewriter effect to any element,
// call typewrite(element, text, speed) below.

function typewrite(el, text, speed = 55) {
  el.textContent = '';
  let i = 0;
  const tick = () => {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(tick, speed);
    }
  };
  tick();
}

// Example: uncomment to animate the last terminal output line
// const typingEl = document.querySelector('.term-output.typing');
// if (typingEl) {
//   const fullText = typingEl.textContent;
//   typingEl.textContent = '';
//   typewrite(typingEl, fullText);
// }

/* ── NAV SMOOTH CLOSE ON MOBILE ──────────── */
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      sidebar.classList.remove('open');
    }
  });
});
