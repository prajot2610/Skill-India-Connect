document.addEventListener('DOMContentLoaded', () => {
  updateNavigation();

  const logoutBtn = document.getElementById('nav-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      Auth.logout();
    });
  }
});

function updateNavigation() {
  const loginBtn = document.getElementById('nav-login');
  const registerBtn = document.getElementById('nav-register');
  const dashboardBtn = document.getElementById('nav-dashboard');
  const logoutBtn = document.getElementById('nav-logout');

  if (Auth.isAuthenticated()) {
    if (loginBtn) loginBtn.classList.add('hidden');
    if (registerBtn) registerBtn.classList.add('hidden');
    if (dashboardBtn) {
      dashboardBtn.classList.remove('hidden');
      const user = Auth.getUser();
      dashboardBtn.href = `dashboard-${user.role}.html`;
    }
    if (logoutBtn) logoutBtn.classList.remove('hidden');
  }
}

// Utility for formatting dates
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
