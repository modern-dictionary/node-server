const Redis = require("ioredis");

const redisUri ="redis://:IYzjt8tFofqdHfNH4Ryiw2mU@dictionary-redis:6379/0";
const redis = new Redis(redisUri);

redis.on("connect", () => console.log("Connected to Redis!"));
redis.on("error", (err) => console.error("Redis Error:", err));

module.exports = redis;
