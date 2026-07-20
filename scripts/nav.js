/* Mobile menu for the shared top nav (#site-nav).
   Self-injects a hamburger button so no per-page markup is needed.
   The homepage uses the left rail instead and has no #site-nav. */
(function () {
  var nav = document.getElementById('site-nav');
  if (!nav) return;
  var inner = nav.querySelector('.nav-inner');
  var links = nav.querySelector('.nav-links');
  if (!inner || !links) return;

  var BURGER = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  var CLOSE = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

  var btn = document.createElement('button');
  btn.className = 'nav-toggle';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = BURGER;
  inner.appendChild(btn);

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
