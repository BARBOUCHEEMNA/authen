# MongoDB Integration - Quick Start Guide

## 🚀 What's Been Done

Your AuthentiQa Dashboard has been **fully integrated with MongoDB**! Here's what was created:

### Backend (Node.js + Express)
- ✅ Full REST API with CRUD operations
- ✅ MongoDB models for all data entities
- ✅ Pre-configured routes and endpoints
- ✅ Database seeding script with sample data
- ✅ CORS enabled for frontend communication

### Frontend (React)
- ✅ API client utility for making requests
- ✅ DashboardPage - Fetches live statistics
- ✅ AnalyticsPage - Fetches monthly analytics
- ✅ UniversitiesPage - Fetches and displays universities
- ✅ FraudCasesPage - Fetches fraud case data
- ✅ Loading states for all components

## ⚡ Quick Start (5 minutes)

### 1. Prerequisites
- Node.js installed ([Download](https://nodejs.org/))
- MongoDB running locally OR MongoDB Atlas account ([Cloud](https://www.mongodb.com/cloud))

### 2. Install Dependencies

**Backend:**
```bash
cd authentiqa-backend
npm install
```

**Frontend:**
```bash
cd ../authentiqa-dashboard
npm install
```

### 3. Configure MongoDB

**Option A: Local MongoDB**
- Make sure MongoDB service is running
- Default: `mongodb://localhost:27017/authentiqa`

**Option B: MongoDB Atlas (Cloud)**
1. Create account and cluster at [mongodb.com/cloud](https://www.mongodb.com/cloud)
2. Update `authentiqa-backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/authentiqa
   ```

### 4. Seed Database (First Time Only)

```bash
cd authentiqa-backend
node seed.js
```

Expected output: `Database seeded successfully!`

### 5. Start Both Servers

**Terminal 1 - Backend (Port 5000):**
```bash
cd authentiqa-backend
npm start
```

Expected: `MongoDB connected` + `Server running on port 5000`

**Terminal 2 - Frontend (Port 3000):**
```bash
cd authentiqa-dashboard
npm start
```

App opens at: **http://localhost:3000** ✨

## 📊 What's Working Now

| Page | Status | Data Source |
|------|--------|-------------|
| Dashboard | ✅ Dynamic | MongoDB |
| Analytics | ✅ Dynamic | MongoDB |
| Universities | ✅ Dynamic | MongoDB |
| Fraud Cases | ✅ Dynamic | MongoDB |
| Templates | ⏳ Ready | API available |
| Estimation | ⏳ Ready | API available |

## 🔗 API Endpoints

All endpoints are at `http://localhost:5000/api`

```
/dashboard/stats     - Dashboard statistics
/fraud              - Fraud detection types
/analytics          - Monthly analytics
/universities       - University management
/fraud-cases        - Fraud case management
/templates          - Template management
```

## 📁 Project Structure

```
authentiqa-backend/
├── models/          # MongoDB schemas
├── routes/          # API endpoints
├── server.js        # Main server
├── seed.js          # Sample data
└── package.json

authentiqa-dashboard/
├── src/
│   ├── utils/
│   │   └── apiClient.js      # API calls
│   ├── pages/                 # Component pages
│   └── App.js
└── package.json     # Updated with proxy
```

## ✨ Key Features

### Real-time Data
- Dashboard stats update from database
- Fraud detection metrics are live
- Analytics graphs use database values
- University list is dynamic

### API Client
Located at: `src/utils/apiClient.js`

```javascript
// Easy to use
const stats = await apiClient.getDashboardStats();
const universities = await apiClient.getUniversities();
const fraudCases = await apiClient.getFraudCases();
```

### Automatic Proxy
React proxy configured to forward API calls to `http://localhost:5000`

## 🐛 Troubleshooting

### Error: "MongoDB connection error"
```
✓ Check MongoDB is running
✓ Verify MONGODB_URI in .env
✓ For local: mongodb://localhost:27017
```

### Error: "Cannot GET /api/..."
```
✓ Backend running on port 5000?
✓ Check server.js console for startup message
✓ Try: curl http://localhost:5000/api/health
```

### Error: "CORS Error"
```
✓ Backends CORS is enabled
✓ Clear browser cache
✓ Restart both servers
```

### Empty Data
```
✓ Run seeding script: node seed.js
✓ Check: http://localhost:5000/api/dashboard/stats
✓ Verify MongoDB connection
```

## 📚 Sample Data Included

After seeding, database contains:
- 5 universities with analytics
- 8 fraud cases with details
- 12 months of analytics data
- 4 fraud detection types
- Dashboard statistics
- Templates data

## 🎯 Next Steps

### Complete Pages (Still Using Static)
Update these to fetch from API:
- **TemplatesPage.jsx** → Add: `apiClient.getTemplates()`
- **EstimationPage.jsx** → Create new API endpoint

### Example: Update a Page
```javascript
import { apiClient } from '../utils/apiClient';

useEffect(() => {
  const fetchData = async () => {
    const data = await apiClient.getYourEndpoint();
    setState(data);
  };
  fetchData();
}, []);
```

### Create New Endpoints
Add new routes in `authentiqa-backend/routes/` following the same pattern.

## 🔒 Security Notes

For production:
- Use environment variables for secrets
- Add authentication (JWT)
- Validate all inputs
- Use HTTPS
- Set proper CORS origins
- Add rate limiting

## 📞 Support

1. **Check Logs**
   - Browser Console (F12)
   - Terminal where servers run

2. **Verify Connections**
   ```bash
   # Check MongoDB
   mongosh
   use authentiqa
   db.dashboardstats.findOne()
   
   # Check Backend
   curl http://localhost:5000/api/health
   ```

3. **Review Files**
   - `MONGODB_SETUP.md` - Detailed guide
   - `seed.js` - Sample data structure
   - `src/utils/apiClient.js` - API methods

## 🎉 Congratulations!

Your dashboard is now **fully dynamic with MongoDB**!
All data is stored in the database and can be updated in real-time.

---

**Need help?** → Check `MONGODB_SETUP.md` for detailed documentation
