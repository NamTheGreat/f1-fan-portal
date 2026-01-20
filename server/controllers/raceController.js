const F1_DATA_SERVICE = process.env.F1_DATA_SERVICE_URL || 'http://localhost:5001';

const getRaces = async (req, res) => {
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
