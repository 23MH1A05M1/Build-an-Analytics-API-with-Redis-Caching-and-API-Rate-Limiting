const request = require('supertest');
const app = require('../src/app');

describe('Metrics API', () => {

    it('should return daily metrics', async () => {
        const res = await request(app).get('/api/v1/metrics/daily');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

});
