/* ============================================================
   SWEET MEMORIES — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {


  // ============================================================
  // Hamburger Menu Toggle
  // ============================================================
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('header-nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      const isActive = hamburger.classList.toggle('is-active');
      nav.classList.toggle('is-open', isActive);
      hamburger.setAttribute('aria-expanded', String(isActive));
      hamburger.setAttribute('aria-label', isActive ? 'メニューを閉じる' : 'メニューを開く');
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close menu when a nav link is clicked
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('is-active');
        nav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'メニューを開く');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') &&
          !nav.contains(e.target) &&
          !hamburger.contains(e.target)) {
        hamburger.classList.remove('is-active');
        nav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'メニューを開く');
        document.body.style.overflow = '';
      }
    });
  }


  // ============================================================
  // Header — add shadow on scroll
  // ============================================================
  const header = document.getElementById('site-header');

  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }


  // ============================================================
  // Polaroid Gallery — drag to scroll on desktop
  // ============================================================
  const polaroidGrid = document.getElementById('polaroid-grid');

  if (polaroidGrid) {
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    polaroidGrid.addEventListener('mousedown', function (e) {
      isDragging = true;
      startX = e.pageX - polaroidGrid.offsetLeft;
      scrollStart = polaroidGrid.scrollLeft;
      polaroidGrid.classList.add('is-dragging');
    });

    polaroidGrid.addEventListener('mouseleave', function () {
      isDragging = false;
      polaroidGrid.classList.remove('is-dragging');
    });

    polaroidGrid.addEventListener('mouseup', function () {
      isDragging = false;
      polaroidGrid.classList.remove('is-dragging');
    });

    polaroidGrid.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - polaroidGrid.offsetLeft;
      const distance = (x - startX) * 1.8;
      polaroidGrid.scrollLeft = scrollStart - distance;
    });
  }


  // ============================================================
  // Graceful fallback for missing placeholder images
  // ============================================================
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () {
      this.style.visibility = 'hidden';
    });
  });


});
