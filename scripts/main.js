/* ============================================
   MAIN.JS — Scroll Reveal & Utilities
   ============================================ */

// --- Scroll Reveal ---
// Observes elements with .reveal or .reveal-group
// and adds .is-visible when they enter the viewport.

(function initScrollReveal() {
  const REVEAL_SELECTOR = '.reveal, .reveal-group';
  const THRESHOLD = 0.15; // 15% of element must be visible to trigger

  // Skip if IntersectionObserver isn't supported
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Unobserve after revealing — no re-hiding on scroll back
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: THRESHOLD,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
    observer.observe(el);
  });
})();


// --- Active Nav Link ---
// Marks the current page's nav link as .active based on pathname.

(function initActiveNav() {
  const links = document.querySelectorAll('.nav__link');
  const currentPath = window.location.pathname;

  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;

    const isHome = href === '/' && (currentPath === '/' || currentPath === '/index.html');
    const isMatch = href !== '/' && currentPath.startsWith(href);

    if (isHome || isMatch) {
      link.classList.add('active');
    }
  });
})();


// --- Sticky Nav Shadow ---
// Adds a subtle shadow to the nav when the page is scrolled.

(function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const updateNav = () => {
    if (window.scrollY > 8) {
      nav.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)';
    } else {
      nav.style.boxShadow = '';
    }
  };

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav(); // run on load in case page is already scrolled
})();


// --- Utility: debounce ---
function debounce(fn, delay = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}


// --- Utility: smooth scroll for anchor links ---
(function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const targetId = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();
