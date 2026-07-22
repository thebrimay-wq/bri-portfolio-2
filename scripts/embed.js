/* ============================================
   EMBED.JS — Side-panel embed mode
   When a page is opened inside the homepage side
   panel (in an iframe, or with ?embed=1), add the
   `embedded` class so site.css hides its own nav +
   footer. Runs synchronously in <head> — no flash.
   ============================================ */
(function () {
  try {
    var embedded = location.search.indexOf('embed=1') !== -1 || window.self !== window.top;
    if (embedded) {
      document.documentElement.classList.add('embedded');
    }
  } catch (e) {
    /* cross-origin access can throw — ignore */
  }
  /* Apply the saved theme before paint so there's no flash of the wrong
     theme. Runs in <head>. With no saved choice, CSS falls back to the
     OS preference via prefers-color-scheme. */
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || t === 'light') {
      document.documentElement.setAttribute('data-theme', t);
    }
  } catch (e) { /* storage blocked — ignore */ }
})();
