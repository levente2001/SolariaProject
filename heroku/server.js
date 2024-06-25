require('dotenv').config();
const express = require('express');
const api = require('growatt');

const app = express();
const port = process.env.PORT || 3000;
const user = process.env.GROWATT_USER;
const password = process.env.GROWATT_PASSWORD;

let latestProductionData = null;

const growatt = new api({});

async function fetchSolarProductionData() {
    try {
        await growatt.login(user, password);
        if (!growatt.isConnected()) throw new Error('Growatt API not connected');

        const options = { deviceData: true };
        const plantData = await growatt.getAllPlantData(options);
        latestProductionData = plantData['yourPlantId']['devices']['yourDeviceId']['totalData'].eToday; // Adjust path as necessary

        console.log('Updated production data:', latestProductionData);
    } catch (error) {
        console.error('Failed to fetch production data:', error);
    } finally {
        await growatt.logout();
    }
}

// Poll Growatt API every 10 minutes
setInterval(fetchSolarProductionData, 600000);

// HTTP endpoint to get the latest production data
app.get('/production', (req, res) => {
    res.json({ latestProductionData: latestProductionData || 'Data not yet fetched' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    fetchSolarProductionData(); // Initial fetch
});
