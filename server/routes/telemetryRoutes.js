const express = require('express');
const router = express.Router();

const F1_DATA_SERVICE = process.env.F1_DATA_SERVICE_URL || 'http://localhost:5001';

// Get telemetry data for a driver
router.get('/:year/:round/:driver', async (req, res) => {
    const { year, round, driver } = req.params;

    try {
        const response = await fetch(`${F1_DATA_SERVICE}/api/telemetry/${year}/${round}/${driver}`);
        const data = await response.json();

        if (response.ok) {
            return res.status(200).json(data);
        } else {
            return res.status(response.status).json(data);
        }
    } catch (error) {
        console.error(`Failed to fetch telemetry from FastF1 service:`, error);
        return res.status(500).json({ message: "Error fetching telemetry" });
    }
});

// Get live timing
router.get('/live/timing', async (req, res) => {
    try {
        const response = await fetch(`${F1_DATA_SERVICE}/api/live/timing`);
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error(`Failed to fetch live timing:`, error);
        return res.status(500).json({ message: "Error fetching live timing" });
    }
});

module.exports = router;
