const redis = require('../utils/redisClient');

const TTL = process.env.CACHE_TTL_SECONDS || 300;

const get = async (key) => {
    return await redis.get(key);
};

const set = async (key, value) => {
    await redis.set(key, value, {
        EX: TTL
    });
};

module.exports = { get, set };
