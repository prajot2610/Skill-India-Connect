class Auth {
  static async login(email, password) {
    const data = await API.post('/auth/login', { email, password });
    this.setSession(data);
    this.redirectBasedOnRole(data.role);
    return data;
  }

  static async register(userData) {
    const data = await API.post('/auth/register', userData);
    this.setSession(data);
    this.redirectBasedOnRole(data.role);
    return data;
  }

  static setSession(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({
      id: data._id,
      name: data.name,
      email: data.email,
      role: data.role
    }));
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  }

  static getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  static isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  static redirectBasedOnRole(role) {
    switch (role) {
      case 'learner':
        window.location.href = 'dashboard-learner.html';
        break;
      case 'recruiter':
        window.location.href = 'dashboard-recruiter.html';
        break;
      case 'admin':
        window.location.href = 'dashboard-admin.html';
        break;
      default:
        window.location.href = 'index.html';
    }
  }
}
