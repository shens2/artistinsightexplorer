# 🚀 Deployment Guide

## Quick Deploy Options

### 1. Frontend-Only Demo (GitHub Pages)
If you just want to deploy the frontend for demo purposes:

```bash
cd client
npm run deploy
```

⚠️ **Note**: This will only work for UI demonstration. You'll need to deploy the backend separately for full functionality.

### 2. Full Stack Deployment

#### Backend Deployment (Choose one):

##### Option A: Railway
1. Create account at [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Deploy the `server` folder
4. Add environment variables in Railway dashboard:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET` 
   - `OPENAI_API_KEY`
   - `PORT` (usually automatic)
5. Copy your Railway URL (e.g., `https://your-app.railway.app`)

##### Option B: Render
1. Create account at [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set build command: `cd server && npm install`
5. Set start command: `cd server && npm start`
6. Add environment variables in Render dashboard
7. Copy your Render URL (e.g., `https://your-app.onrender.com`)

#### Frontend Deployment:

##### Option A: Netlify (Recommended)
1. Create account at [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Configure build settings:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/dist`
4. Add environment variable:
   - `VITE_API_URL`: Your backend URL from step above
5. Deploy!

##### Option B: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project root
3. Follow prompts
4. Add environment variable in Vercel dashboard:
   - `VITE_API_URL`: Your backend URL

## Environment Variables Reference

### Backend (.env in server folder):
```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```

### Frontend (Platform environment variables):
```env
VITE_API_URL=https://your-backend-url.com
```

## Getting API Keys

### Spotify API:
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in app name and description
5. Copy Client ID and Client Secret

### OpenAI API:
1. Go to [OpenAI Platform](https://platform.openai.com)
2. Create account or sign in
3. Go to API Keys section
4. Create new secret key
5. Copy the key (keep it secure!)

## Testing Deployment

1. Deploy backend first and test the API endpoints:
   - `GET https://your-backend-url.com/` should return a welcome message
   - `POST https://your-backend-url.com/api/token` should return Spotify token

2. Deploy frontend with correct `VITE_API_URL`

3. Test the full application:
   - Search for an artist
   - Verify albums load
   - Test AI chat functionality

## Troubleshooting

- **CORS Issues**: Make sure your backend allows your frontend domain
- **Environment Variables**: Double-check all keys are correctly set
- **Build Errors**: Run `npm run build` locally first to catch issues
- **API Limits**: Check your Spotify/OpenAI usage quotas

## Development vs Production

- **Development**: Backend runs on `localhost:5000`, frontend on `localhost:5173`
- **Production**: Backend and frontend are deployed separately with environment variables connecting them
