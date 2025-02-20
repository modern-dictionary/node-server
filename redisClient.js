const Redis = require("ioredis");

const redisUri = process.env.REDIS_URI || "redis://127.0.0.1:6379";
const redis = new Redis(redisUri);

redis.on("connect", () => console.log("Connected to Redis!"));
redis.on("error", (err) => console.error("Redis Error:", err));

module.exports = redis;
