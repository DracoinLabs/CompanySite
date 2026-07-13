(function () {
  'use strict';

  var reviews = window.REVIEWS_DATA || [];
  var logos = window.PARTNER_LOGOS || [];
  var reviewsGrid = document.getElementById('reviewsGrid');
  var logosGrid = document.getElementById('logosGrid');

  function buildReviewCard(r) {
    var card = document.createElement('div');
    card.className = 'card card--review';
    card.innerHTML =
      '<div class="review-stars" aria-label="5 out of 5 stars">★★★★★</div>' +
      '<p class="review-text">"' + r.text + '"</p>' +
      '<div class="reviewer">' +
        '<div class="reviewer-avatar" aria-hidden="true">' + r.initials + '</div>' +
        '<div>' +
          '<div class="reviewer-name">' + r.name + '</div>' +
          '<div class="reviewer-role">' + r.role + ' · ' + r.company + '</div>' +
        '</div>' +
      '</div>';
    return card;
  }

  if (reviewsGrid) {
    reviews.forEach(function (r) {
      reviewsGrid.appendChild(buildReviewCard(r));
    });
  }

  if (logosGrid) {
    logosGrid.innerHTML = logos.map(function (name) {
      return '<span class="partner-logo">' + name + '</span>';
    }).join('');
  }
})();
