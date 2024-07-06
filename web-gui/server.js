'use strict';
const express = require('express');
const cors = require('cors');  // Add this line
const api = require('growatt');


// Initialize variables
const user = 'Otthon162';
const passwort = 'otthon1234';
let growattInstance;


// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors());  // Add this line

// Helper function to sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to get devices data
async function getDevicesData() {
  const growatt = new api({});
  let login = await growatt.login(user, passwort).catch(e => {
    console.log(e);
  });

  if (growatt.isConnected()) {
    let options = { plantData: false, deviceData: true, deviceTyp: false, weather: false, chartLastArray: false };
    let getAllPlantData = await growatt.getAllPlantData(options);
    const devices = getAllPlantData['1444463']['devices']['DMG0B0204E']['totalData'].eToday;
    return devices;
  } else {
    throw new Error('Could not connect to Growatt API');
  }
}

// Endpoint to get devices data
app.get('/devices', async (req, res) => {
  try {
    const devices = await getDevicesData();
    res.json({ devices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/devices`);
});

// Function to continuously update devices data
async function updateDevicesData() {
  growattInstance = new api({});
  await growattInstance.login(user, passwort).catch(e => {
    console.log(e);
  });

  if (growattInstance.isConnected()) {
    while (true) {
      const devices = await getDevicesData();
      let producedEnergy = [];
      producedEnergy.push(devices);
      const lastElement = producedEnergy[producedEnergy.length - 1];
      let firstElement = producedEnergy[0];
      console.log(producedEnergy);
      await sleep(60000); // Wait for 1 minute
    }
  } else {
    console.log('Could not connect to Growatt API');
  }
}

updateDevicesData();
