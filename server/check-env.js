import dotenv from 'dotenv';

dotenv.config();

console.log('🔍 Checking environment variables...\n');

const requiredVars = [
  'SPOTIFY_CLIENT_ID',
  'SPOTIFY_CLIENT_SECRET', 
  'OPENAI_API_KEY'
];

let allGood = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value && value !== `your_${varName.toLowerCase()}_here`) {
    console.log(`✅ ${varName}: Loaded (${value.length} characters)`);
  } else {
    console.log(`❌ ${varName}: Missing or placeholder value`);
    allGood = false;
  }
});

console.log('\n📊 Environment Check:');
console.log(allGood ? '✅ All environment variables loaded correctly!' : '❌ Some environment variables are missing or incorrect');

if (allGood) {
  console.log('\n🚀 Environment is ready! The server should work properly.');
} else {
  console.log('\n⚠️ Please check your .env file and make sure all values are correct.');
}
