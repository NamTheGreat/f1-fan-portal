const getRaces = async (req, res) => {
    const year = req.query.year || '2024';

    try {
        // Try fetching from OpenF1
        const response = await fetch(`https://api.openf1.org/v1/meetings?year=${year}`);
        const data = await response.json();

        if (data && data.length > 0) {
            // Map OpenF1 data to our format
            const races = data.map(meeting => ({
                id: meeting.meeting_key,
                round: meeting.meeting_key, // OpenF1 doesn't strictly have 'round' in meetings, using key
                name: meeting.meeting_name,
                circuit: meeting.circuit_short_name,
                date: meeting.date_start,
                country: meeting.country_name
            }));

            // Deduplicate (OpenF1 might return duplicates for multi-day events if queried differently, but meetings should be unique)
            // But just in case, let's sort by date
            races.sort((a, b) => new Date(a.date) - new Date(b.date));

            return res.status(200).json(races);
        }
    } catch (error) {
        console.warn(`OpenF1 fetch failed for year ${year}, falling back to mock data.`);
    }

    // Fallback Mock Data
    const racesDb = {
        '2024': [
            { id: 1, round: 1, name: 'Bahrain Grand Prix', circuit: 'Bahrain International Circuit', date: '2024-03-02', country: 'Bahrain' },
            { id: 2, round: 2, name: 'Saudi Arabian Grand Prix', circuit: 'Jeddah Corniche Circuit', date: '2024-03-09', country: 'Saudi Arabia' },
            { id: 3, round: 3, name: 'Australian Grand Prix', circuit: 'Albert Park Circuit', date: '2024-03-24', country: 'Australia' },
            { id: 4, round: 4, name: 'Japanese Grand Prix', circuit: 'Suzuka International Racing Course', date: '2024-04-07', country: 'Japan' },
            { id: 5, round: 5, name: 'Chinese Grand Prix', circuit: 'Shanghai International Circuit', date: '2024-04-21', country: 'China' },
        ],
        '2025': [
            { id: 101, round: 1, name: 'Australian Grand Prix', circuit: 'Albert Park Circuit', date: '2025-03-16', country: 'Australia' },
            { id: 102, round: 2, name: 'Chinese Grand Prix', circuit: 'Shanghai International Circuit', date: '2025-03-23', country: 'China' },
            { id: 103, round: 3, name: 'Japanese Grand Prix', circuit: 'Suzuka International Racing Course', date: '2025-04-06', country: 'Japan' },
            { id: 104, round: 4, name: 'Bahrain Grand Prix', circuit: 'Bahrain International Circuit', date: '2025-04-13', country: 'Bahrain' },
            { id: 105, round: 5, name: 'Saudi Arabian Grand Prix', circuit: 'Jeddah Corniche Circuit', date: '2025-04-20', country: 'Saudi Arabia' },
        ],
        '2026': [
            { id: 201, round: 1, name: 'Spanish Grand Prix', circuit: 'Circuit de Barcelona-Catalunya', date: '2026-03-08', country: 'Spain' },
            { id: 202, round: 2, name: 'Canadian Grand Prix', circuit: 'Circuit Gilles Villeneuve', date: '2026-03-22', country: 'Canada' },
            { id: 203, round: 3, name: 'Bahrain Grand Prix', circuit: 'Bahrain International Circuit', date: '2026-04-05', country: 'Bahrain' },
            { id: 204, round: 4, name: 'Miami Grand Prix', circuit: 'Miami International Autodrome', date: '2026-05-03', country: 'USA' },
            { id: 205, round: 5, name: 'Monaco Grand Prix', circuit: 'Circuit de Monaco', date: '2026-05-24', country: 'Monaco' },
        ]
    };

    res.status(200).json(racesDb[year] || []);
};

const getRaceById = (req, res) => {
    const races = [
        {
            id: 1,
            round: 1,
            name: 'Bahrain Grand Prix',
            circuit: 'Bahrain International Circuit',
            date: '2024-03-02',
            country: 'Bahrain',
            lapRecord: '1:31.447 (Pedro de la Rosa, 2005)',
            trivia: 'The first ever race of the 2024 season.',
            videoId: 'sL2D82D9kC4' // Example video ID
        },
        {
            id: 2,
            round: 2,
            name: 'Saudi Arabian Grand Prix',
            circuit: 'Jeddah Corniche Circuit',
            date: '2024-03-09',
            country: 'Saudi Arabia',
            lapRecord: '1:30.734 (Lewis Hamilton, 2021)',
            trivia: 'One of the fastest street circuits in the world.',
            videoId: 'jN2D82D9kC4'
        },
        // ... add more details for others if needed, using generic fallback
    ];
    const race = races.find(r => r.id === parseInt(req.params.id));

    if (race) {
        res.status(200).json(race);
    } else {
        // Return a generic race object if not found in detailed list, but exists in basic list
        // For MVP, just return a mock object
        res.status(200).json({
            id: req.params.id,
            name: 'Grand Prix Details',
            circuit: 'Unknown Circuit',
            lapRecord: '1:30.000 (Mock Driver)',
            trivia: 'This is a mock detail view for MVP.',
            videoId: 'dQw4w9WgXcQ'
        });
    }
};

module.exports = { getRaces, getRaceById };
