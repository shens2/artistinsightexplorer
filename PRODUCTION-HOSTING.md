# 🚀 Production Hosting Guide for Artist Insight Explorer

## 📋 Pre-Deployment Checklist

### 1. Security & Environment Setup
- [ ] **Never commit API keys** to Git (check `.gitignore`)
- [ ] **Use environment variables** for all sensitive data
- [ ] **Set up production environment variables** on hosting platforms
- [ ] **Enable HTTPS** for both frontend and backend
- [ ] **Update CORS settings** for production domains

### 2. Backend Deployment (Choose One)

#### Option A: Railway (Recommended)
**Cost**: Free tier available, then $5+/month
**Pros**: Easy setup, automatic deployments, good for Node.js

**Steps**:
1. Create account at [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Create new project → Deploy from GitHub repo
4. Set root directory to `/server`
5. Add environment variables in Railway dashboard:
   ```
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_CLIENT_SECRET=your_client_secret
   OPENAI_API_KEY=your_openai_key
   PORT=3000
   NODE_ENV=production
   ```
6. Deploy automatically triggers
7. Get your backend URL: `https://your-app-name.railway.app`

#### Option B: Render
**Cost**: Free tier (with limitations), then $7+/month
**Pros**: Free tier available, easy setup

**Steps**:
1. Create account at [render.com](https://render.com)
2. Create "New Web Service"
3. Connect GitHub repository
4. Configure:
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Environment**: Node
5. Add environment variables in Render dashboard
6. Deploy and get URL: `https://your-app-name.onrender.com`

#### Option C: Vercel (Backend)
**Cost**: Free tier, then $20+/month
**Pros**: Excellent performance, global CDN

**Steps**:
1. Install Vercel CLI: `npm i -g vercel`
2. In server directory: `vercel`
3. Follow prompts
4. Add environment variables via Vercel dashboard

### 3. Frontend Deployment (Choose One)

#### Option A: Netlify (Recommended for React)
**Cost**: Free tier generous, then $19+/month
**Pros**: Excellent for React, easy custom domains, form handling

**Steps**:
1. Create account at [netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Configure build settings:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`
4. Add environment variables:
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```
5. Enable automatic deployments
6. Get URL: `https://your-app-name.netlify.app`

#### Option B: Vercel (Frontend)
**Cost**: Free tier, excellent performance

**Steps**:
1. Install Vercel CLI: `npm i -g vercel`
2. In client directory: `vercel`
3. Add environment variable: `VITE_API_URL=your_backend_url`
4. Get URL: `https://your-app-name.vercel.app`

#### Option C: GitHub Pages
**Cost**: Free
**Pros**: Free, integrated with GitHub
**Cons**: Static only, requires separate backend hosting

**Steps**:
1. In client directory: `npm run deploy`
2. Enable GitHub Pages in repository settings

### 4. Domain Configuration (Optional but Recommended)

#### Custom Domain Setup
1. **Purchase domain** (Namecheap, GoDaddy, etc.)
2. **Configure DNS**:
   - Frontend: Point to Netlify/Vercel
   - Backend: Point to Railway/Render
3. **Enable SSL** (usually automatic)
4. **Update environment variables** with new domains

### 5. Production Optimizations

#### Backend Optimizations
```javascript
// Update server/index.js for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com', 'https://your-app.netlify.app']
    : true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

#### Frontend Optimizations
- **Optimize images** and assets
- **Enable compression** (Gzip/Brotli)
- **Set up CDN** for static assets
- **Configure caching** headers

### 6. Monitoring & Analytics

#### Error Monitoring
- **Sentry** for error tracking
- **LogRocket** for session replay
- **Server logs** monitoring

#### Performance Monitoring
- **Google Analytics** for usage
- **Web Vitals** for performance
- **Uptime monitoring** (UptimeRobot)

### 7. Maintenance & Updates

#### Continuous Deployment
- **Automatic deployments** from main branch
- **Preview deployments** for pull requests
- **Environment-specific** configurations

#### Backup & Security
- **Database backups** (if using database)
- **API rate limiting** 
- **Input validation** and sanitization
- **Security headers** (Helmet.js)

## 💰 Cost Breakdown (Monthly)

### Free Tier Option
- **Backend**: Railway Free or Render Free
- **Frontend**: Netlify Free
- **Domain**: $10-15/year (optional)
- **Total**: ~$0-2/month

### Professional Setup
- **Backend**: Railway Pro ($5) or Render ($7)
- **Frontend**: Netlify Pro ($19) or Vercel Pro ($20)
- **Domain**: $10-15/year
- **Monitoring**: Sentry Free tier
- **Total**: ~$25-45/month

## 🚀 Quick Start Commands

```bash
# 1. Deploy backend to Railway
git push origin main  # (after connecting to Railway)

# 2. Deploy frontend to Netlify
cd client
npm run build
# Then drag/drop dist folder to Netlify

# 3. Or use CLI deployments
npm install -g netlify-cli vercel
netlify deploy --prod
# or
vercel --prod
```

## ⚠️ Important Security Notes

1. **Never expose API keys** in frontend code
2. **Use HTTPS everywhere** in production
3. **Validate all inputs** on backend
4. **Set up proper CORS** for your domains
5. **Monitor API usage** to avoid unexpected bills
6. **Set up rate limiting** to prevent abuse

## 🔧 Environment Variables Summary

### Backend (.env)
```env
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
OPENAI_API_KEY=your_openai_key
PORT=3000
NODE_ENV=production
```

### Frontend (Platform Environment Variables)
```env
VITE_API_URL=https://your-backend-domain.com
```

This setup will give you a professional, scalable deployment! 🎉
