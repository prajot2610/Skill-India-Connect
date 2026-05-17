module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Join a room specific to user ID (for targeted notifications)
    socket.on('joinRoom', (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined room`);
    });

    // Handle generic notifications
    socket.on('sendNotification', (data) => {
      // data should contain { toUserId, message }
      if (data.toUserId) {
        io.to(data.toUserId).emit('receiveNotification', {
          message: data.message,
          timestamp: new Date()
        });
      }
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};
