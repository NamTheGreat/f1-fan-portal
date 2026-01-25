const { manualDrivers } = require('../data/manualData');

// ==========================================
// TOGGLE THIS TO 'true' TO USE MANUAL DATA
// ==========================================
const USE_MANUAL_DATA = false;

const getDrivers = async (req, res) => {
    // If manual mode is on, return local data immediately
    if (USE_MANUAL_DATA) {
        console.log('Using MANUAL driver data');
        return res.status(200).json(manualDrivers);
    }

    const year = req.query.year || '2024';
    const F1_DATA_SERVICE = process.env.F1_DATA_SERVICE_URL || 'http://localhost:5001';

    try {
        const response = await fetch(`${F1_DATA_SERVICE}/api/drivers/${year}`);
        let data = await response.json();

        if (response.ok) {
            // MERGE LOGIC
            if (Array.isArray(data)) {
                // Get manual data for this specific year
                const yearManualDrivers = manualDrivers[year] || [];

                data = data.map(driver => {
                    // Find match in that year's manual data
                    const manual = yearManualDrivers.find(d => d.number == driver.number);
                    if (manual) {
                        return { ...driver, ...manual };
                    }
                    return driver;
                });
            }
            return res.status(200).json(data);
        } else {
            return res.status(response.status).json(data);
        }
    } catch (error) {
        console.error(`Failed to fetch drivers from FastF1 service:`, error);
        return res.status(500).json({ message: "Error fetching drivers" });
    }
};

module.exports = { getDrivers };
