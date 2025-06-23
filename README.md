# Artist Insight Explorer

A React-based web application that uses the Spotify Web API to search for artists and display their albums, integrated with OpenAI API to provide AI-generated insights about artists.

## Features

- Search for any artist using Spotify's database
- View artist information, popularity, genres, and follower count
- Browse artist's complete album discography
- AI-powered chat for insights about the artist
- Clean, modern UI built with Tailwind CSS

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- Spotify Developer Account
- OpenAI API Key

### 1. Clone and Setup

```bash
cd artist-insight-explorer
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

### 4. Get Your API Keys

**Spotify API:**
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Copy your Client ID and Client Secret

**OpenAI API:**
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account and get your API key

### 5. Run the Application

Start the backend server:
```bash
cd server
npm run dev
```

In a new terminal, start the frontend:
```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
artist-insight-explorer/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   └── ...
│   └── package.json
├── server/                 # Express.js backend
│   ├── index.js           # Main server file
│   ├── .env.example       # Environment variables template
│   └── package.json
└── README.md
```

## API Endpoints

- `POST /api/token` - Get Spotify access token
- `POST /api/ask` - Send prompts to OpenAI

## Technologies Used

- **Frontend:** React, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, OpenAI API, Spotify Web API
- **Deployment Ready:** Can be deployed to Netlify, Vercel, Railway, Render

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy Commands

**Frontend build:**
```bash
cd client
npm run build
```

**Deploy to GitHub Pages:**
```bash
cd client
npm run deploy
```

### Live Demo
- Frontend: Deploy to Netlify/Vercel
- Backend: Deploy to Railway/Render
- Set environment variables on each platform
