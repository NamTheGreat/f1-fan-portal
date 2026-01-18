const getRaces = (req, res) => {
    const races = [
        {
            id: 1,
            round: 1,
            name: 'Bahrain Grand Prix',
            circuit: 'Bahrain International Circuit',
            date: '2024-03-02',
            country: 'Bahrain',
        },
        {
            id: 2,
            round: 2,
            name: 'Saudi Arabian Grand Prix',
            circuit: 'Jeddah Corniche Circuit',
            date: '2024-03-09',
            country: 'Saudi Arabia',
        },
        {
            id: 3,
            round: 3,
            name: 'Australian Grand Prix',
            circuit: 'Albert Park Circuit',
            date: '2024-03-24',
            country: 'Australia',
        },
        {
            id: 4,
            round: 4,
            name: 'Japanese Grand Prix',
            circuit: 'Suzuka International Racing Course',
            date: '2024-04-07',
            country: 'Japan',
        },
        {
            id: 5,
            round: 5,
            name: 'Chinese Grand Prix',
            circuit: 'Shanghai International Circuit',
            date: '2024-04-21',
            country: 'China',
        },
    ];

    res.status(200).json(races);
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
