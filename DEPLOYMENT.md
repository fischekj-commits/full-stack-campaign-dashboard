# Deployment Guide

## Railway Deployment (Backend)

### Prerequisites
- Railway account
- PostgreSQL database provisioned on Railway

### Environment Variables

Set these in your Railway project:

```
NODE_ENV=production
PORT=5000
DB_HOST=<your-railway-postgres-host>
DB_PORT=5432
DB_NAME=<your-database-name>
DB_USER=<your-database-user>
DB_PASSWORD=<your-database-password>
JWT_SECRET=<generate-a-secure-random-string>
JWT_EXPIRES_IN=7d
CORS_ORIGIN=<your-frontend-url>
```

### Deploy Backend

1. **Add PostgreSQL Database:**
   - In Railway dashboard, click "New" → "Database" → "Add PostgreSQL"
   - Railway will automatically set DATABASE_URL

2. **Run Database Schema:**
   ```bash
   # Connect to your Railway PostgreSQL and run:
   psql $DATABASE_URL -f server/schema.sql
   ```

3. **Deploy:**
   - Push to your GitHub repository
   - Railway will automatically detect and deploy the backend
   - Your API will be available at: `https://your-project.railway.app`

### Deploy Frontend (Vercel)

1. **Update API URL:**
   - Update `client/src/services/api.ts` to point to your Railway backend URL

2. **Deploy to Vercel:**
   ```bash
   cd client
   npx vercel
   ```

3. **Environment Variables:**
   - Set `VITE_API_URL` if using environment-based configuration

### Deploy Frontend (Netlify)

1. **Build Command:** `npm run build`
2. **Publish Directory:** `dist`
3. **Base Directory:** `client`

## All-in-One Railway Deployment

To deploy both frontend and backend on Railway:

1. Create two separate Railway services
2. Deploy backend from root with current configuration
3. Deploy frontend from `client` directory with:
   - Build command: `npm run build`
   - Start command: `npx vite preview --port $PORT --host 0.0.0.0`

## Database Schema

After deploying, make sure to run the database schema:

```bash
# Using Railway CLI
railway run psql -f server/schema.sql

# Or connect directly
psql <your-connection-string> -f server/schema.sql
```

## Post-Deployment

1. Update CORS_ORIGIN to your frontend URL
2. Test authentication endpoints
3. Create a test campaign
4. Verify all CRUD operations work
