(function () {
  'use strict';

  var grid = document.getElementById('projectGrid');
  var filters = document.querySelectorAll('.portfolio-filter-btn');
  var modal = document.getElementById('projectModal');
  var projects = window.PORTFOLIO_PROJECTS || [];

  if (!grid) return;

  function renderCard(p, index) {
    var card = document.createElement('article');
    card.className = 'card card--portfolio';
    card.dataset.category = p.category;
    card.style.animationDelay = (index * 0.06) + 's';

    var techHtml = p.tech.map(function (t) {
      return '<span class="tech-tag">' + t + '</span>';
    }).join('');

    card.innerHTML =
      '<div class="card-top">' +
        '<span class="card-cat">' + p.categoryLabel + '</span>' +
        '<span class="status-badge status-badge--' + p.statusClass + '">' + p.status + '</span>' +
      '</div>' +
      '<h3>' + p.name + '</h3>' +
      '<p>' + p.description + '</p>' +
      '<div class="card-tech">' + techHtml + '</div>' +
      '<p class="card-highlight">' + p.achievement + '</p>' +
      '<button type="button" class="btn btn-primary" data-project="' + p.id + '">View details</button>';

    return card;
  }

  function renderAll(filter) {
    grid.innerHTML = '';
    var filtered = filter === 'All Projects'
      ? projects
      : projects.filter(function (p) { return p.category === filter; });

    filtered.forEach(function (p, i) {
      grid.appendChild(renderCard(p, i));
    });

    grid.querySelectorAll('[data-project]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-project');
        var project = projects.find(function (p) { return p.id === id; });
        if (project) openModal(project);
      });
    });
  }

  function openModal(p) {
    if (!modal) return;
    document.getElementById('modalTitle').textContent = p.name;
    document.getElementById('modalCategory').textContent = p.categoryLabel;
    document.getElementById('modalStatus').textContent = p.status;
    document.getElementById('modalStatus').className = 'status-badge status-badge--' + p.statusClass;
    document.getElementById('modalDesc').textContent = p.description;
    document.getElementById('modalAchievement').textContent = p.achievement;
    document.getElementById('modalTech').innerHTML = p.tech.map(function (t) {
      return '<span class="tech-tag">' + t + '</span>';
    }).join('');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filters.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      renderAll(btn.textContent.trim());
    });
  });

  if (modal) {
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  renderAll('All Projects');
})();
