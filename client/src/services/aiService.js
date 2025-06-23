import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const askAI = async (prompt) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/ask`, {
      prompt,
    });
    
    return response.data.answer;
  } catch (error) {
    console.error('Error asking AI:', error);
    throw new Error('Failed to get AI response');
  }
};
