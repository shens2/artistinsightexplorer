import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';

let accessToken = null;

// Get Spotify access token from our backend
const getAccessToken = async () => {
  if (accessToken) {
    return accessToken;
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/api/token`);
    accessToken = response.data.access_token;
    
    // Reset token after 55 minutes (tokens expire after 1 hour)
    setTimeout(() => {
      accessToken = null;
    }, 55 * 60 * 1000);
    
    return accessToken;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw new Error('Failed to authenticate with Spotify');
  }
};

// Make authenticated requests to Spotify API
const spotifyRequest = async (endpoint) => {
  const token = await getAccessToken();
  
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Spotify API error:', error.response?.data || error.message);
    throw new Error('Failed to fetch data from Spotify');
  }
};

// Search for an artist
export const searchArtist = async (query) => {
  try {
    const data = await spotifyRequest(`/search?q=${encodeURIComponent(query)}&type=artist&limit=1`);
    
    if (data.artists.items.length === 0) {
      return null;
    }
    
    return data.artists.items[0];
  } catch (error) {
    console.error('Error searching artist:', error);
    throw error;
  }
};

// Get detailed artist information
export const getArtistDetails = async (artistId) => {
  try {
    const data = await spotifyRequest(`/artists/${artistId}`);
    return data;
  } catch (error) {
    console.error('Error getting artist details:', error);
    throw error;
  }
};

// Get artist's albums
export const getArtistAlbums = async (artistId) => {
  try {
    const data = await spotifyRequest(`/artists/${artistId}/albums?include_groups=album,single&limit=50`);
    
    // Remove duplicates and sort by release date
    const uniqueAlbums = data.items.filter((album, index, self) => 
      index === self.findIndex(a => a.name === album.name)
    );
    
    return uniqueAlbums.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  } catch (error) {
    console.error('Error getting artist albums:', error);
    throw error;
  }
};

// Get related artists (optional)
export const getRelatedArtists = async (artistId) => {
  try {
    const data = await spotifyRequest(`/artists/${artistId}/related-artists`);
    return data.artists.slice(0, 6); // Limit to 6 related artists
  } catch (error) {
    console.error('Error getting related artists:', error);
    throw error;
  }
};
