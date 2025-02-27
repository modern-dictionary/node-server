// handlers/mouseHandler.js

const userColors = {};

function getRandomColor() {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#33FFF6", "#F6FF33"];
    return colors[Math.floor(Math.random() * colors.length)];
}

module.exports = {
  handleMouseMove: (socket, io, data) => {
    console.log(`Mouse move from user ${data.userId} in team ${data.teamId}: x=${data.position.x}, y=${data.position.y}`);
    if (!userColors[data.userId]) {
      userColors[data.userId] = getRandomColor();  // رنگ جدید فقط یکبار اختصاص داده می‌شود
    }

    // انتشار رویداد حرکت موس به سایر کاربران در room تیم
    io.to(`team-${data.teamId}`).emit("mouse-move", {
        userId: data.userId,
        position: data.position,
        color: userColors[data.userId]
    });

    console.log("sending mouse move", {
      userId: data.userId,
      position: data.position,
      color: userColors[data.userId]  || getRandomColor()
    });
  }
};
