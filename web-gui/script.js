const fetch = require('node-fetch');

async function getDevices() {
  try {
    const response = await fetch('http://localhost:3000/devices');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching devices:', error);
  }
}

getDevices();
