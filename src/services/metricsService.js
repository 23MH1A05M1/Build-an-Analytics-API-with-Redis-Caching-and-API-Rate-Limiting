const generateMockData = () => {
    const data = [];
    const startDate = new Date('2023-01-01');

    for (let i = 0; i < 120; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);

        data.push({
            date: date.toISOString().split('T')[0],
            users_active: Math.floor(Math.random() * 500),
            page_views: Math.floor(Math.random() * 5000),
            revenue: parseFloat((Math.random() * 1000).toFixed(2))
        });
    }

    return data;
};

const mockData = generateMockData();

const getDailyMetrics = (startDate, endDate) => {
    return mockData.filter(item => {
        return (!startDate || item.date >= startDate) &&
               (!endDate || item.date <= endDate);
    });
};

const getHourlyMetrics = (date) => {
    // For now mock hourly breakdown
    const hours = Array.from({ length: 24 }, (_, i) => ({
        hour: i,
        users_active: Math.floor(Math.random() * 100),
        page_views: Math.floor(Math.random() * 500),
        revenue: parseFloat((Math.random() * 100).toFixed(2))
    }));

    return {
        date: date || "2023-01-01",
        hourly: hours
    };
};

module.exports = {
    getDailyMetrics,
    getHourlyMetrics
};


// module.exports = { getDailyMetrics };
