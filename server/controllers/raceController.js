const F1_DATA_SERVICE = process.env.F1_DATA_SERVICE_URL || 'http://localhost:5001';
const { manualRaces } = require('../data/manualData');

// ==========================================
// TOGGLE THIS TO 'true' TO USE MANUAL DATA
// ==========================================
const USE_MANUAL_DATA = false;

const getRaces = async (req, res) => {
    // If manual mode is on, return local data immediately
    if (USE_MANUAL_DATA) {
        console.log('Using MANUAL race data');
        return res.status(200).json(manualRaces);
    }

    const year = req.query.year || '2024';

    try {
        const response = await fetch(`${F1_DATA_SERVICE}/api/schedule/${year}`);
        const data = await response.json();

        if (response.ok) {
            return res.status(200).json(data);
        } else {
            return res.status(response.status).json(data);
        }
    } catch (error) {
        console.error(`Failed to fetch races from FastF1 service:`, error);
        return res.status(500).json({ message: "Error fetching race data" });
    }
};

const getRaceById = async (req, res) => {
    const { id } = req.params;

    // If manual mode is on, find race in local data
    if (USE_MANUAL_DATA) {
        const race = manualRaces.find(r => r.id == id || r.round == id);
        if (race) {
            // Add extra details that might missing in simple list
            return res.status(200).json({
                ...race,
                lapRecord: ' ',
                trivia: ' ',
                videoId: ' '
            });
        } else {
            return res.status(404).json({ message: "Race not found in manual data" });
        }
    }

    const year = req.query.year || '2024';

    try {
        const response = await fetch(`${F1_DATA_SERVICE}/api/race/${year}/${id}`);
        const data = await response.json();

        if (response.ok) {
            return res.status(200).json(data);
        } else {
            return res.status(response.status).json(data);
        }
    } catch (error) {
        console.error(`Failed to fetch race from FastF1 service:`, error);
        return res.status(500).json({ message: "Error fetching race details" });
    }
};

module.exports = { getRaces, getRaceById };
