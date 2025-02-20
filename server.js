// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// Import handler ها
const textHandler = require("./handlers/textHandler");
const mouseHandler = require("./handlers/cursorHandler");
const presenceHandler = require("./handlers/presenceHandler");

io.on("connection", (socket) => {
  console.log("کاربر متصل شد:", socket.id);
  socket.on("join-team", (teamId) => {
        console.log(`👥 User ${socket.id} joined team ${teamId}`);
        socket.join(`team-${teamId}`);
    });

  // رویداد ورود به تیم
  socket.on("join-team", (data) => {
    presenceHandler.handleJoinTeam(socket, io, data);
  });

  // رویداد خروج از تیم (در disconnect)
  socket.on("leave-team", (data) => {
    presenceHandler.handleLeaveTeam(socket, io, data);
  });

  // رویداد ویرایش متن
  socket.on("edit_text", (data) => {
    textHandler.handleTextEdit(socket, io, data);
  });

  // رویداد حرکت موس
  socket.on("mouse_move", function(data) {
    mouseHandler.handleMouseMove(socket, io, data);
  });

  socket.on("disconnect", () => {
    console.log("کاربر قطع ارتباط کرد:", socket.id);
  });
});

// const Redis = require("ioredis");
//
// const redis = new Redis({
//   host: "127.0.0.1",
//   port: 6379,
// });
//
// let isRedisConnected = false;
//
// redis.on("connect", () => {
//   console.log("✅ Redis connected.");
//   isRedisConnected = true;
//
//   // فقط وقتی که Redis متصل شد، Subscribe کن
//   redis.subscribe("team_categories", "team_words", (err, count) => {
//     if (err) {
//       console.error("Failed to subscribe: ", err.message);
//     } else {
//       console.log(`Subscribed to ${count} channels.`);
//     }
//   });
// });
//
// redis.on("error", (err) => {
//   console.error("❌ Redis error:", err);
//   isRedisConnected = false;
// });
//
// // مدیریت پیام‌های Redis
// redis.on("message", (channel, message) => {
//   if (!isRedisConnected) return; // اگر Redis قطع شده بود، پیام رو پردازش نکن
//
//   const data = JSON.parse(message);
//
//   if (channel === "team_categories") {
//     io.emit("category-added", data);
//     console.log("New category added:", data);
//   }
//
//   if (channel === "team_words") {
//     io.emit("word-added", data);
//     console.log("New word added:", data);
//   }
// });
//
// // ** مدیریت کاربران آنلاین **
//
// // ذخیره کاربران آنلاین
// async function addUserOnline(userId) {
//   if (!isRedisConnected) return;
//   await redis.sadd("online_users", userId);
// }
//
// // خواندن کاربران آنلاین
// async function getOnlineUsers() {
//   if (!isRedisConnected) return [];
//   const users = await redis.smembers("online_users");
//   return users;
// }
//
// // حذف کاربر از لیست آنلاین‌ها
// async function removeUserOnline(userId) {
//   if (!isRedisConnected) return;
//   await redis.srem("online_users", userId);
// }
//
// module.exports = { addUserOnline, getOnlineUsers, removeUserOnline };


server.listen(3000, () => {
  console.log("سرور WebSocket در پورت 3000 راه‌اندازی شد");
});
