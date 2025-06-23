# 🚀 Deployment Checklist

## Before You Deploy

### 1. API Keys & Security
- [ ] Have Spotify Client ID and Secret ready
- [ ] Have OpenAI API key ready  
- [ ] All keys are valid and working locally
- [ ] Never commit .env files to Git

### 2. Choose Your Hosting Platforms

#### Recommended Combo (Easiest):
- [ ] **Backend**: Railway (Free tier → $5/month)
- [ ] **Frontend**: Netlify (Free tier → $19/month)

#### Budget Option:
- [ ] **Backend**: Render (Free tier with sleep)
- [ ] **Frontend**: Netlify (Free tier)

#### Performance Option:
- [ ] **Backend**: Vercel (Free → $20/month)
- [ ] **Frontend**: Vercel (Free → $20/month)

## Step-by-Step Deployment

### Step 1: Deploy Backend First

#### Railway (Recommended):
1. [ ] Go to [railway.app](https://railway.app)
2. [ ] Sign up with GitHub
3. [ ] "Deploy from GitHub repo"
4. [ ] Select your repository
5. [ ] Configure:
   - [ ] Root Directory: `/server`
   - [ ] Build Command: `npm install` (auto-detected)
   - [ ] Start Command: `npm start` (auto-detected)
6. [ ] Add Environment Variables:
   ```
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_CLIENT_SECRET=your_client_secret  
   OPENAI_API_KEY=your_openai_key
   NODE_ENV=production
   ```
7. [ ] Deploy and copy your Railway URL: `https://xxx.railway.app`

### Step 2: Deploy Frontend

#### Netlify (Recommended):
1. [ ] Go to [netlify.com](https://netlify.com)
2. [ ] Sign up with GitHub
3. [ ] "Add new site" → "Import from Git"
4. [ ] Select your repository
5. [ ] Configure:
   - [ ] Base directory: `client`
   - [ ] Build command: `npm run build`
   - [ ] Publish directory: `client/dist`
6. [ ] Add Environment Variables:
   ```
   VITE_API_URL=https://your-railway-url.railway.app
   ```
7. [ ] Deploy and get your Netlify URL: `https://xxx.netlify.app`

### Step 3: Update Production CORS

1. [ ] Update `server/index.js` CORS settings:
   ```javascript
   origin: [
     'https://your-app.netlify.app',
     'https://yourdomain.com' // if you have custom domain
   ]
   ```
2. [ ] Redeploy backend

### Step 4: Test Everything

1. [ ] Visit your frontend URL
2. [ ] Test artist search functionality
3. [ ] Test AI chat functionality
4. [ ] Check browser console for errors
5. [ ] Test on mobile device

## Custom Domain (Optional)

### Buy Domain:
- [ ] Purchase domain (Namecheap, GoDaddy, etc.)

### Configure DNS:
- [ ] Point domain to Netlify: 
  - Add CNAME record: `www` → `your-app.netlify.app`
  - Add A record: `@` → Netlify IP
- [ ] Update Netlify domain settings
- [ ] Update CORS in backend for new domain

## Monitoring & Maintenance

### Set Up Monitoring:
- [ ] Enable Netlify form notifications
- [ ] Set up error tracking (optional)
- [ ] Monitor API usage limits

### Regular Maintenance:
- [ ] Monitor OpenAI API usage/costs
- [ ] Monitor Spotify API rate limits
- [ ] Keep dependencies updated
- [ ] Check for security updates

## 💡 Pro Tips

1. **Start with free tiers** to test everything
2. **Deploy backend first**, then frontend
3. **Test thoroughly** before announcing
4. **Monitor costs** especially OpenAI usage
5. **Set up automatic deployments** from your main branch

## 🆘 If Something Goes Wrong

### Common Issues:
- **CORS errors**: Check CORS configuration in backend
- **API not working**: Verify environment variables are set correctly
- **Build fails**: Check build logs for specific errors
- **Slow performance**: Consider upgrading hosting plans

### Getting Help:
- Check hosting platform documentation
- Review browser console errors
- Check server logs in hosting dashboard
- Test API endpoints directly with curl/Postman

## 🎉 You're Live!

Once deployed successfully:
- [ ] Share your app URL: `https://your-app.netlify.app`
- [ ] Consider adding a custom domain
- [ ] Add to your portfolio/resume
- [ ] Share on social media

Your Artist Insight Explorer is now live for the world to see! 🚀
