/* ============================================================
   PIXELBUZZ — Portfolio JS
   Masonry filter, Lightbox
   ============================================================ */

(function() {
  'use strict';

  // --- Filter Tabs ---
  var filterTabs = document.querySelectorAll('.filter-tab');
  var galleryItems = document.querySelectorAll('.gallery-item');

  filterTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      // Update active tab
      filterTabs.forEach(function(t) { t.classList.remove('active'); });
      this.classList.add('active');

      var filter = this.getAttribute('data-filter');

      galleryItems.forEach(function(item) {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = '';
          setTimeout(function() { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(function() { item.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // --- Lightbox ---
  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  var lightboxImg = lightbox.querySelector('.lightbox__img');
  var lightboxClose = lightbox.querySelector('.lightbox__close');
  var lightboxPrev = lightbox.querySelector('.lightbox__nav--prev');
  var lightboxNext = lightbox.querySelector('.lightbox__nav--next');
  var currentIndex = 0;

  function getVisibleImages() {
    return Array.from(galleryItems).filter(function(item) {
      return item.style.display !== 'none';
    });
  }

  function openLightbox(index) {
    var visible = getVisibleImages();
    if (index < 0 || index >= visible.length) return;
    currentIndex = index;
    var img = visible[index].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigateLightbox(direction) {
    var visible = getVisibleImages();
    currentIndex = (currentIndex + direction + visible.length) % visible.length;
    var img = visible[currentIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }

  // Bind gallery clicks
  galleryItems.forEach(function(item, i) {
    item.addEventListener('click', function() {
      var visible = getVisibleImages();
      var idx = visible.indexOf(item);
      openLightbox(idx >= 0 ? idx : 0);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', function() { navigateLightbox(-1); });
  if (lightboxNext) lightboxNext.addEventListener('click', function() { navigateLightbox(1); });

  // Close on background click
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
})();
