const axios = require('axios');

const API_URL = 'http://localhost:3000/api';
const rand = Math.floor(Math.random() * 10000);
const USER = {
  name: 'Test User',
  email: `debug${rand}@example.com`,
  password: 'password123'
};

const run = async () => {
  try {
    console.log('Sending signup request...', USER);
    const res = await axios.post(`${API_URL}/auth/signup`, USER);
    console.log('Signup Success:', res.data);
  } catch (err) {
    console.error('Signup Failed!');
    if (err.response) {
        console.error('Status:', err.response.status);
        console.error('Data:', JSON.stringify(err.response.data, null, 2));
    } else {
        console.error(err.message);
    }
  }
};

run();
