// const express = require('express');
// const router = express.Router();
// const { getDailyMetrics } = require('../services/metricsService');
// const cacheService = require('../services/cacheService');
// const rateLimit = require('../middleware/rateLimitMiddleware');

// router.get('/daily', rateLimit, async (req, res) => {
//     const { start_date, end_date } = req.query;

//     const cacheKey = `daily:${start_date || 'all'}:${end_date || 'all'}`;

//     const cached = await cacheService.get(cacheKey);
//     if (cached) {
//         res.set('X-Cache-Status', 'HIT');
//         return res.json(JSON.parse(cached));
//     }

//     const data = getDailyMetrics(start_date, end_date);

//     await cacheService.set(cacheKey, JSON.stringify(data));

//     res.set('X-Cache-Status', 'MISS');
//     res.json(data);
// });

// module.exports = router;


const express = require('express');
const router = express.Router();

const { getDailyMetrics, getHourlyMetrics } = require('../services/metricsService');
const cacheService = require('../services/cacheService');
const rateLimit = require('../middleware/rateLimitMiddleware');
const authMiddleware = require('../middleware/authMiddleware');


// ✅ DAILY METRICS
router.get('/daily', authMiddleware, rateLimit, async (req, res) => {
    const { start_date, end_date } = req.query;

    const cacheKey = `daily:${start_date || 'all'}:${end_date || 'all'}`;

    const cached = await cacheService.get(cacheKey);
    if (cached) {
        res.set('X-Cache-Status', 'HIT');
        return res.json(JSON.parse(cached));
    }

    const data = getDailyMetrics(start_date, end_date);

    await cacheService.set(cacheKey, JSON.stringify(data));

    res.set('X-Cache-Status', 'MISS');
    res.json(data);
});


// ✅ HOURLY METRICS
router.get('/hourly', authMiddleware, rateLimit, async (req, res) => {
    const { date } = req.query;

    const cacheKey = `hourly:${date || 'default'}`;

    const cached = await cacheService.get(cacheKey);
    if (cached) {
        res.set('X-Cache-Status', 'HIT');
        return res.json(JSON.parse(cached));
    }

    const data = getHourlyMetrics(date);

    await cacheService.set(cacheKey, JSON.stringify(data));

    res.set('X-Cache-Status', 'MISS');
    res.json(data);
});


module.exports = router;
