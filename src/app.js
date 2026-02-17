require('dotenv').config();
const express = require('express');
const metricsRoutes = require('./routes/metrics');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

app.use('/api/v1/metrics', metricsRoutes);

module.exports = app;
