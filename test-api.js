// Test script for API endpoints
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

console.log('🧪 Testing API endpoints...\n');

// Test 1: Health check
try {
  console.log('1️⃣ Testing server health...');
  const healthResponse = await axios.get(`${API_BASE_URL}/`);
  console.log('✅ Server is running:', healthResponse.data.message);
} catch (error) {
  console.log('❌ Server health check failed:', error.message);
  process.exit(1);
}

// Test 2: Spotify token
try {
  console.log('\n2️⃣ Testing Spotify API...');
  const tokenResponse = await axios.post(`${API_BASE_URL}/api/token`);
  console.log('✅ Spotify token received successfully!');
  console.log('Token type:', typeof tokenResponse.data.access_token);
  console.log('Token length:', tokenResponse.data.access_token ? tokenResponse.data.access_token.length : 0);
} catch (error) {
  console.log('❌ Spotify API test failed:');
  if (error.response) {
    console.log('Status:', error.response.status);
    console.log('Error:', error.response.data.error);
    console.log('Details:', error.response.data.details);
  } else {
    console.log('Error:', error.message);
  }
}

// Test 3: OpenAI API
try {
  console.log('\n3️⃣ Testing OpenAI API...');
  const aiResponse = await axios.post(`${API_BASE_URL}/api/ask`, {
    prompt: 'Say hello in exactly 3 words.'
  });
  console.log('✅ OpenAI API working!');
  console.log('AI Response:', aiResponse.data.answer);
} catch (error) {
  console.log('❌ OpenAI API test failed:');
  if (error.response) {
    console.log('Status:', error.response.status);
    console.log('Error:', error.response.data.error);
    console.log('Details:', error.response.data.details);
  } else {
    console.log('Error:', error.message);
  }
}

console.log('\n🎉 API testing complete!');
