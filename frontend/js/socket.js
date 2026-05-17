function initSocket(userId) {
  // Connect to the Socket.IO server hosted on the backend
  const socket = io('http://localhost:5000');

  socket.on('connect', () => {
    console.log('Connected to notification server');
    // Join the room associated with the user's ID to receive private notifications
    socket.emit('joinRoom', userId);
  });

  socket.on('receiveNotification', (data) => {
    showNotification(data.message);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from notification server');
  });

  return socket;
}

function showNotification(message) {
  const container = document.getElementById('notification-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <strong>Notification</strong>
    <p style="margin: 0; font-size: 0.875rem; color: var(--text-muted);">${message}</p>
  `;

  container.appendChild(toast);

  // Remove toast after 5 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}
