const getDrivers = async (req, res) => {
    const year = req.query.year || '2024';

    try {
        // 1. Get the latest session for the year to get the most recent grid
        const sessionsRes = await fetch(`https://api.openf1.org/v1/sessions?year=${year}&session_name=Race`);
        const sessions = await sessionsRes.json();

        if (sessions && sessions.length > 0) {
            // Pick the last session in the list (most recent race of the year)
            const lastSession = sessions[sessions.length - 1];

            // 2. Fetch drivers for that session
            const driversRes = await fetch(`https://api.openf1.org/v1/drivers?session_key=${lastSession.session_key}`);
            const driversData = await driversRes.json();

            if (driversData && driversData.length > 0) {
                const drivers = driversData.map(d => ({
                    id: d.driver_number,
                    name: d.full_name,
                    team: d.team_name,
                    country: d.country_code,
                    number: d.driver_number,
                    points: 'N/A', // OpenF1 doesn't provide points
                    image: d.headshot_url || 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col/image.png'
                }));

                // Deduplicate by number
                const uniqueDrivers = [];
                const seen = new Set();
                for (const d of drivers) {
                    if (!seen.has(d.number)) {
                        uniqueDrivers.push(d);
                        seen.add(d.number);
                    }
                }

                return res.status(200).json(uniqueDrivers);
            }
        }
    } catch (error) {
        console.warn(`OpenF1 fetch failed for driver year ${year}, falling back to mock data.`);
    }

    // Fallback Mock Data
    const driversDb = {
        '2024': [
            { id: 1, name: 'Max Verstappen', team: 'Red Bull Racing', country: 'Netherlands', number: 1, points: 454, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col/image.png' },
            { id: 2, name: 'Sergio Perez', team: 'Red Bull Racing', country: 'Mexico', number: 11, points: 305, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png.transform/2col/image.png' },
            { id: 3, name: 'Charles Leclerc', team: 'Ferrari', country: 'Monaco', number: 16, points: 308, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col/image.png' },
            { id: 4, name: 'Carlos Sainz', team: 'Ferrari', country: 'Spain', number: 55, points: 246, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/2col/image.png' },
            { id: 5, name: 'Lando Norris', team: 'McLaren', country: 'United Kingdom', number: 4, points: 122, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col/image.png' }
        ],
        '2025': [
            { id: 101, name: 'Max Verstappen', team: 'Red Bull Racing', country: 'Netherlands', number: 1, points: 0, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col/image.png' },
            { id: 102, name: 'Lewis Hamilton', team: 'Ferrari', country: 'United Kingdom', number: 44, points: 0, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col/image.png' },
            { id: 103, name: 'Charles Leclerc', team: 'Ferrari', country: 'Monaco', number: 16, points: 0, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col/image.png' },
            { id: 104, name: 'Lando Norris', team: 'McLaren', country: 'United Kingdom', number: 4, points: 0, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col/image.png' },
            { id: 105, name: 'Oscar Piastri', team: 'McLaren', country: 'Australia', number: 81, points: 0, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/2col/image.png' }
        ],
        '2026': [
            { id: 201, name: 'Max Verstappen', team: 'Red Bull Ford', country: 'Netherlands', number: 1, points: 0, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col/image.png' },
            { id: 202, name: 'Andrea Kimi Antonelli', team: 'Mercedes', country: 'Italy', number: 12, points: 0, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ANTKIM01_Andrea_Kimi_Antonelli/antkim01.png.transform/2col/image.png' },
            { id: 203, name: 'Charles Leclerc', team: 'Ferrari', country: 'Monaco', number: 16, points: 0, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col/image.png' },
            { id: 204, name: 'Fernando Alonso', team: 'Aston Martin Honda', country: 'Spain', number: 14, points: 0, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png.transform/2col/image.png' },
            { id: 205, name: 'Liam Lawson', team: 'Red Bull Ford', country: 'New Zealand', number: 30, points: 0, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LIALAW01_Liam_Lawson/lialaw01.png.transform/2col/image.png' }
        ]
    };

    res.status(200).json(driversDb[year] || []);
};

module.exports = { getDrivers };
