/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Header toggle (mobile)
   */
  const header = document.querySelector('#header');
  const headerToggleBtn = document.querySelector('.header-toggle');
  const headerToggleIcon = headerToggleBtn ? headerToggleBtn.querySelector('i') : null;

  function setHeaderState(open) {
    if (!header || !headerToggleBtn) return;

    header.classList.toggle('header-show', open);
    headerToggleBtn.setAttribute('aria-expanded', String(open));

    if (headerToggleIcon) {
      headerToggleIcon.classList.toggle('bi-list', !open);
      headerToggleIcon.classList.toggle('bi-x', open);
    }
  }

  if (header && headerToggleBtn) {
    headerToggleBtn.addEventListener('click', function () {
      setHeaderState(!header.classList.contains('header-show'));
    });

    // Hide the mobile nav once a same-page link has been used
    document.querySelectorAll('#navmenu a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (header.classList.contains('header-show')) {
          setHeaderState(false);
        }
      });
    });
  }

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', function () {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');

  if (scrollTop) {
    scrollTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const toggleScrollTop = function () {
      scrollTop.classList.toggle('active', window.scrollY > 100);
    };

    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
  }

  /**
   * Animations on scroll
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Typed headline
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped && selectTyped.dataset.typedItems) {
    new Typed('.typed', {
      strings: selectTyped.dataset.typedItems.split(',').map(function (item) {
        return item.trim();
      }),
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Portfolio - Isotope layout and category filters
   * Filters are reachable and usable with the keyboard (Enter / Space).
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    const container = isotopeItem.querySelector('.isotope-container');
    if (!container) return;

    let isotope = null;
    let activeFilter = isotopeItem.dataset.defaultFilter || '*';

    imagesLoaded(container, function () {
      isotope = new Isotope(container, {
        itemSelector: '.isotope-item',
        layoutMode: isotopeItem.dataset.layout || 'masonry',
        filter: activeFilter,
        sortBy: isotopeItem.dataset.sort || 'original-order'
      });
    });

    function activateFilter(filterItem) {
      const current = isotopeItem.querySelector('.isotope-filters .filter-active');

      if (current) {
        current.classList.remove('filter-active');
        current.setAttribute('aria-pressed', 'false');
      }

      filterItem.classList.add('filter-active');
      filterItem.setAttribute('aria-pressed', 'true');

      // Keep the choice even if Isotope is still waiting for the images
      activeFilter = filterItem.dataset.filter;

      if (isotope) {
        isotope.arrange({ filter: activeFilter });
      }

      if (typeof aosInit === 'function') {
        aosInit();
      }
    }

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filterItem) {
      filterItem.setAttribute('role', 'button');
      filterItem.setAttribute('tabindex', '0');
      filterItem.setAttribute('aria-pressed', String(filterItem.classList.contains('filter-active')));

      filterItem.addEventListener('click', function () {
        activateFilter(filterItem);
      });

      filterItem.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;

        event.preventDefault();
        activateFilter(filterItem);
      });
    });
  });

  /**
   * Correct the scroll position when the page is opened with a #hash
   */
  window.addEventListener('load', function () {
    if (!window.location.hash) return;

    const section = document.querySelector(window.location.hash);
    if (!section) return;

    setTimeout(function () {
      const scrollMarginTop = parseInt(getComputedStyle(section).scrollMarginTop) || 0;
      window.scrollTo({
        top: section.offsetTop - scrollMarginTop,
        behavior: 'smooth'
      });
    }, 100);
  });

  /**
   * Nav menu scrollspy
   */
  const navmenuLinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenuLinks.forEach(function (link) {
      if (!link.hash) return;

      const section = document.querySelector(link.hash);
      if (!section) return;

      const position = window.scrollY + 200;
      const isCurrent = position >= section.offsetTop &&
        position <= (section.offsetTop + section.offsetHeight);

      link.classList.toggle('active', isCurrent);
    });
  }

  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
