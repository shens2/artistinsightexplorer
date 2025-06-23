#!/bin/bash

echo "🚀 Deploying Artist Insight Explorer..."

# Build the frontend
echo "📦 Building frontend..."
cd client
npm run build

echo "✅ Frontend build complete!"
echo ""
echo "🌐 Deployment options:"
echo ""
echo "1️⃣  Netlify (Recommended for frontend):"
echo "   - Connect your GitHub repo to Netlify"
echo "   - Set build command: npm run build"
echo "   - Set publish directory: client/dist"
echo "   - Set base directory: client"
echo ""
echo "2️⃣  Vercel:"
echo "   - Install Vercel CLI: npm i -g vercel"
echo "   - Run: vercel"
echo "   - Follow the prompts"
echo ""
echo "3️⃣  GitHub Pages:"
echo "   - Push to GitHub"
echo "   - Enable GitHub Pages in repository settings"
echo "   - Set source to 'dist' folder"
echo ""
echo "📱 Backend deployment (Railway/Render):"
echo "   - Deploy the 'server' folder separately"
echo "   - Set environment variables in the platform dashboard"
echo "   - Update VITE_API_URL in frontend environment variables"
echo ""
echo "✨ Don't forget to set your environment variables!"
