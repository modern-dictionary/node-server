// handlers/presenceHandler.js

const redis = require("../redisClient");

module.exports = {
  handleJoinTeam: async (socket, io, data) => {
    console.log(`کاربر ${data.userId} به تیم ${data.teamId} پیوست.`);

    socket.join(`team-${data.teamId}`);

    // اضافه کردن کاربر به لیست کاربران آنلاین
    await redis.sadd("online_users", data.userId);

    io.emit("user-joined", {
      userId: data.userId,
      onlineUsers: await redis.smembers("online_users"), // لیست کاربران آنلاین
    });
  },

  handleLeaveTeam: async (socket, io, data) => {
    console.log(`کاربر ${data.userId} از تیم ${data.teamId} خارج شد.`);

    socket.leave(`team-${data.teamId}`);

    // حذف کاربر از لیست آنلاین‌ها
    await redis.srem("online_users", data.userId);

    io.emit("user-left", {
      userId: data.userId,
      onlineUsers: await redis.smembers("online_users"),
    });
  },
};
