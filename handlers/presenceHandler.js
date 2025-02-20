// handlers/presenceHandler.js

module.exports = {
  handleJoinTeam: (socket, io, data) => {
    // data شامل teamId و userId است.
    console.log(`کاربر ${data.userId} به تیم ${data.teamId} پیوست.`);

    // قرار دادن کاربر در room مربوط به تیم
    socket.join(`team-${data.teamId}`);

    // انتشار رویداد ورود کاربر به سایر کاربران تیم
    io.to(`team-${data.teamId}`).emit("user-joined", {
      userId: data.userId
    });
  },

  handleLeaveTeam: (socket, io, data) => {
    // data شامل teamId و userId است.
    console.log(`کاربر ${data.userId} از تیم ${data.teamId} خارج شد.`);

    // خارج کردن کاربر از room مربوط به تیم
    socket.leave(`team-${data.teamId}`);

    // انتشار رویداد خروج کاربر به سایر کاربران تیم
    io.to(`team-${data.teamId}`).emit("user-left", {
      userId: data.userId
    });
  }
};
