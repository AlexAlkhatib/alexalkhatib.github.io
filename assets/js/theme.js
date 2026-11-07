/**
* Theme switch (light / dark)
* Loaded in <head> so the stored or preferred theme is applied before the first paint.
*/

(function () {
  "use strict";

  var STORAGE_KEY = 'portfolio-theme';
  var root = document.documentElement;
  var media = window.matchMedia('(prefers-color-scheme: dark)');
  var isFrench = (root.lang || 'fr').toLowerCase().indexOf('fr') === 0;

  var LABELS = {
    fr: { toDark: 'Activer le mode sombre', toLight: 'Activer le mode clair' },
    en: { toDark: 'Turn on dark mode', toLight: 'Turn on light mode' }
  };
  var labels = isFrench ? LABELS.fr : LABELS.en;

  function storedTheme() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function syncToggle(theme) {
    var button = document.getElementById('theme-toggle');
    if (!button) return;

    var dark = theme === 'dark';
    var label = dark ? labels.toLight : labels.toDark;

    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);

    var icon = button.querySelector('i');
    if (icon) {
      icon.className = 'bi ' + (dark ? 'bi-sun' : 'bi-moon-stars');
    }
  }

  function applyTheme(theme, persist) {
    root.setAttribute('data-theme', theme);

    if (persist) {
      try {
        window.localStorage.setItem(STORAGE_KEY, theme);
      } catch (error) {
        // Storage can be blocked (private mode): the theme still applies for this page.
      }
    }

    syncToggle(theme);
  }

  applyTheme(storedTheme() || (media.matches ? 'dark' : 'light'), false);

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('theme-toggle');
    if (!button) return;

    button.addEventListener('click', function () {
      applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
    });

    syncToggle(root.getAttribute('data-theme'));
  });

  function followSystemTheme(event) {
    if (!storedTheme()) {
      applyTheme(event.matches ? 'dark' : 'light', false);
    }
  }

  if (typeof media.addEventListener === 'function') {
    media.addEventListener('change', followSystemTheme);
  } else if (typeof media.addListener === 'function') {
    media.addListener(followSystemTheme);
  }
})();
