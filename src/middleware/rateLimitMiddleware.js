// const redis = require('../utils/redisClient');

// const WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW_SECONDS);
// const LIMIT = parseInt(process.env.RATE_LIMIT_REQUESTS);

// module.exports = async (req, res, next) => {
//     const ip = req.ip;
//     const key = `rate:${ip}`;

//     const current = await redis.incr(key);

//     if (current === 1) {
//         await redis.expire(key, WINDOW);
//     }

//     if (current > LIMIT) {
//         return res.status(429).json({ error: 'Too many requests' });
//     }

//     next();
// };


const redis = require('../utils/redisClient');

const WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW_SECONDS) || 60;
const LIMIT = parseInt(process.env.RATE_LIMIT_REQUESTS) || 10;

module.exports = async (req, res, next) => {
    try {
        const ip = req.ip;
        const key = `rate:${ip}`;
        const now = Date.now();
        const windowStart = now - WINDOW * 1000;

        // Remove old requests
        await redis.zRemRangeByScore(key, 0, windowStart);

        // Add current request
        await redis.zAdd(key, {
            score: now,
            value: `${now}`
        });

        // Count requests in window
        const requestCount = await redis.zCard(key);

        // Set expiry for cleanup
        await redis.expire(key, WINDOW);

        if (requestCount > LIMIT) {
            return res.status(429).json({ error: 'Too many requests' });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Rate limit error' });
    }
};

