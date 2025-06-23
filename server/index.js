import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import OpenAI from 'openai';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize OpenAI (only if API key is provided)
let openai = null;
if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// Middleware
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        // Add your production frontend URLs here
        'https://your-app.netlify.app',
        'https://your-app.vercel.app',
        'https://yourdomain.com'
      ]
    : true, // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Artist Insight Explorer API is running!' });
});

// Spotify token endpoint
app.post('/api/token', async (req, res) => {
  try {
    const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
    
    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
      return res.status(500).json({ 
        error: 'Spotify credentials not configured' 
      });
    }

    const credentials = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
    
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    res.json({ access_token: response.data.access_token });
  } catch (error) {
    console.error('Error fetching Spotify token:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to fetch Spotify token',
      details: error.response?.data || error.message 
    });
  }
});

// OpenAI chat endpoint
app.post('/api/ask', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!openai) {
      return res.status(500).json({ 
        error: 'OpenAI API key not configured. Please add your OpenAI API key to the .env file.' 
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a knowledgeable music expert. Provide insightful, engaging, and informative responses about artists, their music, career, and cultural impact. Keep responses concise but comprehensive."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const answer = completion.choices[0]?.message?.content || 'No response generated';
    
    res.json({ answer });
  } catch (error) {
    console.error('Error with OpenAI request:', error.message);
    res.status(500).json({ 
      error: 'Failed to get AI response',
      details: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
