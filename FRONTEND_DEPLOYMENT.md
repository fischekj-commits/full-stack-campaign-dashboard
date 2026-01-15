# Frontend Deployment Guide

Your frontend is now built and ready to deploy! Choose one of the options below:

## ✅ Built Successfully

- Build output: `client/dist/`
- Build size: ~361 KB (gzipped: ~110 KB)
- Ready for production deployment

---

## 🚀 Option 1: Vercel (Recommended - Easiest)

Vercel is perfect for React/Vite apps with automatic deployments.

### Deploy via GitHub Integration:

1. Go to [vercel.com](https://vercel.com)
2. Click "**Add New Project**"
3. Import your GitHub repository: `full-stack-campaign-dashboard`
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - `VITE_API_URL` = Your Railway backend URL
6. Click "**Deploy**"

**Your frontend will be live at**: `https://your-project.vercel.app`

### Deploy via CLI:

```bash
cd client
vercel --prod
```

---

## 🟢 Option 2: Netlify

Netlify is another excellent option with drag-and-drop deployment.

### Deploy via GitHub Integration:

1. Go to [netlify.com](https://netlify.com)
2. Click "**Add new site**" → "**Import an existing project**"
3. Connect to GitHub and select your repository
4. Configure:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`
5. Click "**Deploy**"

**Your frontend will be live at**: `https://your-project.netlify.app`

### Deploy via CLI:

```bash
npm install -g netlify-cli
cd client
netlify deploy --prod --dir=dist
```

### Deploy via Drag & Drop:

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `client/dist` folder
3. Your site is live instantly!

---

## 🚂 Option 3: Railway (Same Platform as Backend)

Deploy both frontend and backend on Railway.

1. In your Railway project, click "**+ New**"
2. Select "**GitHub Repo**"
3. Choose your repository
4. Configure:
   - **Root Directory**: `client`
   - Railway will auto-detect Vite configuration
5. Environment Variables:
   - Add your backend URL if needed
6. Deploy!

**Your frontend will be live at**: Railway-provided URL

---

## 🌐 Option 4: GitHub Pages (Free Static Hosting)

Perfect for simple static hosting.

### Setup:

1. Install gh-pages:
```bash
cd client
npm install --save-dev gh-pages
```

2. Add to `package.json` scripts:
```json
"deploy": "vite build && gh-pages -d dist"
```

3. Deploy:
```bash
npm run deploy
```

**Your frontend will be live at**: `https://yourusername.github.io/full-stack-campaign-dashboard`

---

## 🔧 Post-Deployment Configuration

After deploying, you need to:

### 1. Update Backend CORS

In your Railway backend, update the `CORS_ORIGIN` environment variable:

```
CORS_ORIGIN=https://your-frontend-url.vercel.app
```

Or allow all origins for testing:
```
CORS_ORIGIN=*
```

### 2. Update Frontend API URL (if needed)

If your backend is not on the same domain, update `client/src/services/api.ts`:

```typescript
const api = axios.create({
  baseURL: 'https://your-backend.railway.app/api',
  // ...
});
```

Or use environment variable in `client/.env.production`:
```
VITE_API_URL=https://your-backend.railway.app
```

---

## ✅ Verify Deployment

After deployment, test these:

1. **Frontend loads**: Visit your deployment URL
2. **API connection**: Check browser console for errors
3. **Register**: Create a new account
4. **Login**: Sign in with your account
5. **Create campaign**: Test full CRUD operations

---

## 🎯 Quick Deploy Commands

```bash
# Option 1: Vercel
cd client && vercel --prod

# Option 2: Netlify
cd client && netlify deploy --prod --dir=dist

# Option 3: Railway
# Use Railway dashboard to connect GitHub repo

# Option 4: GitHub Pages
cd client && npm run deploy
```

---

## 📝 Recommended: Vercel + Railway

**Best Setup:**
- **Backend**: Railway (PostgreSQL + Node.js API)
- **Frontend**: Vercel (Optimized for React/Vite)

This combination provides:
- ✅ Automatic deployments on git push
- ✅ Free SSL certificates
- ✅ Global CDN
- ✅ Excellent performance
- ✅ Easy rollbacks
- ✅ Preview deployments for PRs

---

## 🆘 Need Help?

If you encounter issues:

1. Check build logs in your deployment platform
2. Verify environment variables are set
3. Check CORS configuration
4. Test API endpoints directly
5. Check browser console for errors

Your frontend is production-ready and waiting to be deployed! 🚀
