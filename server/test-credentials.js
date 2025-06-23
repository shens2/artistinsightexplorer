import axios from 'axios';

console.log('🧪 Testing Spotify API credentials...');

// Test Spotify token endpoint
async function testSpotifyToken() {
  try {
    const response = await axios.post('http://localhost:5000/api/token');
    console.log('✅ Spotify API: SUCCESS');
    console.log('Token received, length:', response.data.access_token.length);
    return true;
  } catch (error) {
    console.log('❌ Spotify API: FAILED');
    if (error.response) {
      console.log('Error:', error.response.data.error);
      console.log('Details:', error.response.data.details);
    } else {
      console.log('Error:', error.message);
    }
    return false;
  }
}

// Test OpenAI API
async function testOpenAI() {
  try {
    const response = await axios.post('http://localhost:5000/api/ask', {
      prompt: 'Say "API test successful" and nothing else.'
    });
    console.log('✅ OpenAI API: SUCCESS');
    console.log('Response:', response.data.answer);
    return true;
  } catch (error) {
    console.log('❌ OpenAI API: FAILED');
    if (error.response) {
      console.log('Error:', error.response.data.error);
      console.log('Details:', error.response.data.details);
    } else {
      console.log('Error:', error.message);
    }
    return false;
  }
}

// Run tests
const spotifyWorks = await testSpotifyToken();
console.log('');
const openaiWorks = await testOpenAI();

console.log('\n📊 Test Results:');
console.log('Spotify API:', spotifyWorks ? '✅ Working' : '❌ Not working');
console.log('OpenAI API:', openaiWorks ? '✅ Working' : '❌ Not working');

if (spotifyWorks && openaiWorks) {
  console.log('\n🎉 All APIs are working! You can now use the full application.');
} else {
  console.log('\n⚠️ Some APIs are not working. Please check your credentials.');
}
