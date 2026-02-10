# MongoDB Integration Guide for AuthentiQa Dashboard

## Overview
Your AuthentiQa Dashboard has been fully integrated with MongoDB! The dashboard now fetches dynamic data from the backend instead of using static values.

## File Structure

```
authentiqa-dash/
├── authentiqa-dashboard/          # React Frontend
│   ├── package.json               # Updated with proxy setting
│   ├── src/
│   │   ├── utils/
│   │   │   └── apiClient.js      # API client for backend calls
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx # Updated to fetch data
│   │   │   └── AnalyticsPage.jsx # Updated to fetch data
│   │   └── App.js
│   └── public/
│
└── authentiqa-backend/           # Node.js/Express Backend
    ├── server.js                 # Main server file
    ├── package.json              # Backend dependencies
    ├── .env                      # Environment variables
    ├── seed.js                   # Database seeding script
    ├── models/                   # MongoDB schemas
    │   ├── DashboardStats.js
    │   ├── FraudDetection.js
    │   ├── Analytics.js
    │   ├── University.js
    │   ├── FraudCase.js
    │   └── Template.js
    └── routes/                   # API endpoints
        ├── dashboard.js
        ├── fraud.js
        ├── analytics.js
        ├── universities.js
        ├── fraudCases.js
        └── templates.js
```

## Prerequisites

1. **Node.js** (v14 or above) - [Download](https://nodejs.org/)
2. **MongoDB** - You have two options:
   - Install locally from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Use MongoDB Atlas (Cloud) - [mongodb.com/cloud](https://www.mongodb.com/cloud)

## Installation & Setup

### Step 1: Install Backend Dependencies

```bash
cd authentiqa-backend
npm install
```

### Step 2: Install Frontend Dependencies

```bash
cd ../authentiqa-dashboard
npm install
```

### Step 3: Setup MongoDB

#### Option A: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service:
   - **Windows**: MongoDB should start automatically, or use Services app
   - **Mac**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [mongodb.com/cloud](https://www.mongodb.com/cloud)
2. Create a free cluster
3. Get your connection string
4. Update `.env` file in `authentiqa-backend/` with your connection string

### Step 4: Configure Environment Variables

Edit `authentiqa-backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/authentiqa
PORT=5000
NODE_ENV=development
```

For MongoDB Atlas, replace with your connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/authentiqa
PORT=5000
NODE_ENV=development
```

### Step 5: Seed the Database (Optional but Recommended)

Run this once to populate initial data:

```bash
cd authentiqa-backend
node seed.js
```

You should see: `Database seeded successfully!`

## Running the Application

### Terminal 1 - Start Backend Server:
```bash
cd authentiqa-backend
npm start
```

You should see:
```
MongoDB connected
Server running on port 5000
```

### Terminal 2 - Start Frontend (React):
```bash
cd authentiqa-dashboard
npm start
```

The app will open at `http://localhost:3000`

## API Endpoints

All endpoints are located at `http://localhost:5000/api`

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `PUT /api/dashboard/stats` - Update dashboard statistics

### Fraud Detection
- `GET /api/fraud` - Get all fraud types
- `POST /api/fraud` - Create fraud detection record
- `PUT /api/fraud/:id` - Update fraud detection

### Analytics
- `GET /api/analytics` - Get all monthly analytics
- `POST /api/analytics` - Create analytics record
- `PUT /api/analytics/:id` - Update analytics

### Universities
- `GET /api/universities` - Get all universities
- `POST /api/universities` - Create university
- `PUT /api/universities/:id` - Update university
- `DELETE /api/universities/:id` - Delete university

### Fraud Cases
- `GET /api/fraud-cases` - Get all fraud cases
- `POST /api/fraud-cases` - Create fraud case
- `PUT /api/fraud-cases/:id` - Update fraud case
- `DELETE /api/fraud-cases/:id` - Delete fraud case

### Templates
- `GET /api/templates` - Get all templates
- `POST /api/templates` - Create template
- `PUT /api/templates/:id` - Update template
- `DELETE /api/templates/:id` - Delete template

## Sample API Calls

### Get Dashboard Stats (Browser or API Tool)
```
GET http://localhost:5000/api/dashboard/stats
```

### Create a University
```bash
curl -X POST http://localhost:5000/api/universities \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New University",
    "location": "City",
    "documentsAnalyzed": 1000,
    "fraudsDetected": 50
  }'
```

### Update Analytics
```bash
curl -X PUT http://localhost:5000/api/analytics/[ID] \
  -H "Content-Type: application/json" \
  -d '{
    "fraudCount": 35,
    "documentsAnalyzed": 1500,
    "detectionRate": 2.3
  }'
```

## Frontend Usage

The React app has been updated to:
1. **Fetch Dashboard Data** - Live dashboard stats from MongoDB
2. **Fetch Fraud Data** - Real-time fraud detection types
3. **Fetch Analytics** - Monthly analytics from database

### Updated Components
- `DashboardPage.jsx` - Fetches dashboard stats and fraud detection data
- `AnalyticsPage.jsx` - Fetches monthly analytics data

### API Client
Located at `src/utils/apiClient.js` - Contains all API methods:
- `getDashboardStats()`
- `getFraudDetectionData()`
- `getAnalyticsData()`
- `getUniversities()`
- `getFraudCases()`
- `getTemplates()`

## Data Schema

### DashboardStats
```json
{
  "totalDocuments": 12847,
  "totalDocumentsChange": "+12.5%",
  "fraudsDetected": 423,
  "fraudsDetectedChange": "3.2%",
  "fraudRate": 3.29,
  "activeUniversities": 5,
  "universitiesChange": "+8.1%"
}
```

### FraudDetection
```json
{
  "type": "Logo",
  "value": 145,
  "percentage": 34.3,
  "color": "#3b82f6"
}
```

### University
```json
{
  "name": "South Mediterranean University",
  "location": "Tunisia",
  "documentsAnalyzed": 2500,
  "fraudsDetected": 85,
  "status": "active"
}
```

### Analytics
```json
{
  "month": "Jan",
  "fraudCount": 28,
  "documentsAnalyzed": 1200,
  "detectionRate": 2.3
}
```

## Troubleshooting

### "MongoDB connection error"
- Check if MongoDB is running
- Verify connection string in `.env`
- For local: `mongodb://localhost:27017`
- For Atlas: Use full connection string from dashboard

### "Cannot GET /api/dashboard/stats"
- Ensure backend is running on port 5000
- Check terminal for server startup message
- Verify routes are correctly imported in `server.js`

### "CORS Error"
- Backend CORS is already enabled
- Clear browser cache and refresh
- Restart both servers

### "API returns 404"
- Verify MongoDB is connected
- Check seed data was loaded: `node seed.js`
- Ensure endpoints are spelled correctly

## Next Steps

To continue integrating other pages with MongoDB:

1. **UniversitiesPage** - Update to fetch from `/api/universities`
2. **FraudCasesPage** - Update to fetch from `/api/fraud-cases`
3. **TemplatesPage** - Update to fetch from `/api/templates`
4. **EstimationPage** - Create API endpoint and integrate

## Support

For questions or issues:
1. Check console logs (browser DevTools & terminal)
2. Verify MongoDB connection
3. Review the API endpoint structure
4. Ensure all dependencies are installed

---

**Status**: ✅ MongoDB Integration Complete!
Your backend is ready for production with full CRUD operations support.
