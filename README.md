#  Analytics API

A Node.js + Express based Analytics API that provides daily and hourly metrics with:

- Redis caching (Cache-Aside Pattern)
- Sliding Window Rate Limiting (using Redis Sorted Sets)
- API Key Authentication
- Dockerized setup (App + Redis)
- Unit & Integration testing (Jest + Supertest)

---

#  Features

- Daily metrics endpoint
- Hourly metrics endpoint
- Redis caching with configurable TTL
- Sliding window rate limiting
- API key authentication middleware
- Docker & Docker Compose setup
- Automated tests

---

# 🛠 Tech Stack

- Node.js
- Express.js
- Redis
- Docker & Docker Compose
- Jest
- Supertest

---

#  Project Structure

```
analytics-api/
│
├── src/
│   ├── routes/
│   │    └── metrics.js
│   ├── services/
│   │    ├── metricsService.js
│   │    └── cacheService.js
│   ├── middleware/
│   │    ├── rateLimitMiddleware.js
│   │    └── authMiddleware.js
│   ├── utils/
│   │    └── redisClient.js
│   |── app.js
│   |__ server.js
├── tests/
│   └── metrics.test.js
│
├── docker-compose.yml
├── Dockerfile
├── .env.example
└── README.md
```

---

#  Setup Instructions

## 1️ Clone the Repository

```bash
git clone <your-repo-url>
cd analytics-api
```

---

## 2️ Create Environment File

Create a `.env` file in the root directory:

```
REDIS_URL=redis://redis:6379
API_KEY=mysecretkey
CACHE_TTL_SECONDS=300
RATE_LIMIT_REQUESTS=10
RATE_LIMIT_WINDOW_SECONDS=60
```

---

## 3️ Run with Docker

```bash
docker-compose up --build
```

The application will run at:

```
http://localhost:8080/health
```

---

#  Authentication

All API endpoints require the following header:

```
x-api-key: mysecretkey
```

Example using PowerShell:

```powershell
iwr http://localhost:8080/api/v1/metrics/daily -Headers @{"x-api-key"="mysecretkey"}
```

---

#  API Endpoints

---

##  Daily Metrics

**Endpoint:**

```
GET /api/v1/metrics/daily
```

**Optional Query Parameters:**

```
start_date=YYYY-MM-DD
end_date=YYYY-MM-DD
```

**Example:**

```
GET /api/v1/metrics/daily?start_date=2023-01-01&end_date=2023-01-10
```

---

##  Hourly Metrics

**Endpoint:**

```
GET /api/v1/metrics/hourly
```

**Optional Query Parameter:**

```
date=YYYY-MM-DD
```

**Example:**

```
GET /api/v1/metrics/hourly?date=2023-01-01
```

---

# Rate Limiting

Implements Sliding Window Algorithm using Redis Sorted Sets:

- Stores request timestamps
- Removes expired timestamps
- Blocks requests exceeding configured limit
- Returns `429 Too Many Requests`

---

# 🗄 Caching Strategy

Implements Cache-Aside Pattern:

1. Check Redis for cached data
2. If exists → return cached response (HIT)
3. If not → compute data, store in Redis (MISS)

Response header:

```
X-Cache-Status: HIT | MISS
```

---

#  Running Tests

Run:

```bash
npm test
```

Uses:

- Jest
- Supertest

---

#  Docker Services

Docker Compose includes:

- Node.js Application container
- Redis container

---

#  Submission Checklist

- [x] Daily Metrics API  
- [x] Hourly Metrics API  
- [x] Redis Cache (Cache-Aside)  
- [x] Sliding Window Rate Limiting  
- [x] API Key Authentication  
- [x] Dockerized Application  
- [x] Unit & Integration Tests  
- [x] Clean Project Structure  

---
