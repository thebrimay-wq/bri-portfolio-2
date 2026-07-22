/* Mobile menu for the shared top nav (#site-nav).
   Self-injects a hamburger button so no per-page markup is needed.
   The homepage uses the left rail instead and has no #site-nav. */
(function () {
  // Keep the footer copyright year current, everywhere this script loads.
  var yr = String(new Date().getFullYear());
  var yearEls = document.querySelectorAll('.footer-year');
  for (var i = 0; i < yearEls.length; i++) yearEls[i].textContent = yr;

  var nav = document.getElementById('site-nav');
  if (!nav) return;
  var inner = nav.querySelector('.nav-inner');
  var links = nav.querySelector('.nav-links');
  if (!inner || !links) return;

  // ── Group the links + theme toggle + hamburger into a right cluster ──
  var right = document.createElement('div');
  right.className = 'nav-right';
  inner.appendChild(right);
  right.appendChild(links);

  // ── Theme toggle (light ⇆ dark, persisted) ──
  var SUN = '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.7"/><path d="M12 2.5v2.6M12 18.9v2.6M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12h2.6M18.9 12h2.6M4.2 19.8l1.8-1.8M18 6l1.8-1.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';
  var MOON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 14.2A8 8 0 1 1 9.8 4a6.4 6.4 0 0 0 10.2 10.2z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>';
  function isDark() {
    var t = document.documentElement.getAttribute('data-theme');
    if (t) return t === 'dark';
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  var themeBtn = document.createElement('button');
  themeBtn.className = 'nav-theme';
  themeBtn.type = 'button';
  function paintTheme() {
    var dark = isDark();
    themeBtn.innerHTML = dark ? SUN : MOON;
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }
  paintTheme();
  themeBtn.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
    paintTheme();
  });
  right.appendChild(themeBtn);
  // Follow the OS if the visitor hasn't picked a theme explicitly.
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
      if (!document.documentElement.getAttribute('data-theme')) paintTheme();
    });
  }

  var BURGER = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  var CLOSE = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

  var btn = document.createElement('button');
  btn.className = 'nav-toggle';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = BURGER;
  right.appendChild(btn);

  function close() {
    nav.classList.remove('menu-open');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = BURGER;
  }
  function open() {
    nav.classList.add('menu-open');
    btn.setAttribute('aria-expanded', 'true');
    btn.innerHTML = CLOSE;
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    nav.classList.contains('menu-open') ? close() : open();
  });
  links.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('menu-open') && !nav.contains(e.target)) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();
