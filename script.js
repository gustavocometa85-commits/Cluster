// Modal functionality
const openModals = {};
const modalTriggers = document.querySelectorAll('[data-modal]');
const closeButtons = document.querySelectorAll('.modal-close');

modalTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const modalId = trigger.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
      openModals[modalId] = true;
    }
  });
});

closeButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const modal = btn.closest('.modal');
    if (modal) {
      modal.classList.remove('show');
      openModals[modal.id] = false;
    }
  });
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.closest('.modal').classList.remove('show');
      openModals[overlay.closest('.modal').id] = false;
    }
  });
});

// Sidebar toggle
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');

if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener('click', (e) => {
    e.preventDefault();
    sidebar.classList.toggle('active');
  });
}

// Search functionality
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

if (searchInput && searchBtn) {
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      console.log('Searching for:', query);
      alert('Search functionality for: ' + query);
    }
  });
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchBtn.click();
    }
  });
}

// Navigation menu
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

// Table sorting (if needed)
const tableHeaders = document.querySelectorAll('table th');
tableHeaders.forEach((header, index) => {
  header.style.cursor = 'pointer';
  header.addEventListener('click', () => {
    console.log('Sorting by column:', index);
  });
});

// Button actions
const buttons = document.querySelectorAll('button[data-action]');
buttons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const action = btn.getAttribute('data-action');
    console.log('Button action:', action);
  });
});

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

function initializeApp() {
  console.log('Cluster SaaS Application Initialized');
  // Any additional initialization can go here
}

// Prevent default form submissions
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
  });
});

// Show/Hide sections
function showSection(sectionName) {
  const sections = document.querySelectorAll('[id$="-section"]');
  sections.forEach(section => {
    section.style.display = 'none';
  });
  const targetSection = document.getElementById(sectionName + '-section');
  if (targetSection) {
    targetSection.style.display = 'block';
  }
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));
  event.target.classList.add('active');
}
