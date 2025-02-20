const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const redis = require("./redisClient");

// ** راه‌اندازی سرور **
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// ** ایمپورت هندلرها **
const textHandler = require("./handlers/textHandler");
const mouseHandler = require("./handlers/cursorHandler");
const presenceHandler = require("./handlers/presenceHandler");

io.on("connection", async (socket) => {
  console.log("🔵 کاربر متصل شد:", socket.id);

  socket.on("join-team", async (data) => {
    await presenceHandler.handleJoinTeam(socket, io, data);
  });

  socket.on("leave-team", async (data) => {
    await presenceHandler.handleLeaveTeam(socket, io, data);
  });

  socket.on("edit_text", (data) => {
    textHandler.handleTextEdit(socket, io, data);
  });

  socket.on("mouse_move", (data) => {
    mouseHandler.handleMouseMove(socket, io, data);
  });

  socket.on("disconnect", async () => {
    console.log("❌ کاربر قطع ارتباط کرد:", socket.id);

    // حذف کاربر از لیست آنلاین‌ها
    await redis.srem("online_users", socket.id);

    // اطلاع‌رسانی به سایر کاربران
    io.emit("update-online-users", await redis.smembers("online_users"));
  });
});

// ** استارت سرور **
server.listen(3000, () => {
  console.log("🚀 WebSocket Server روی پورت 3000 اجرا شد");
});
