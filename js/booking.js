(function () {
  'use strict';

  var BOOKING_URL = 'https://calendly.com/dracoinlabs/30min?hide_gdpr_banner=1&background_color=ffffff&text_color=09111f&primary_color=0051d5';

  var bookBtn = document.getElementById('bookBtn');
  var modal = document.getElementById('bookingModal');
  var iframe = document.getElementById('bookingFrame');
  var closeBtn = modal && modal.querySelector('.booking-close');

  if (!bookBtn || !modal) return;

  function openBooking() {
    var navLinks = document.getElementById('navLinks');
    var navToggle = document.getElementById('navToggle');
    if (navLinks && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      if (navToggle) navToggle.classList.remove('open');
    }
    if (iframe && !iframe.src) {
      iframe.src = BOOKING_URL;
    }
    modal.classList.add('open');
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeBooking() {
    modal.classList.remove('open');
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    bookBtn.focus();
  }

  bookBtn.addEventListener('click', openBooking);

  if (closeBtn) closeBtn.addEventListener('click', closeBooking);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeBooking();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeBooking();
  });
})();
