// =====================================================================
// 📝 MANUAL DATA EDITOR (Year-Specific)
// =====================================================================
// This file organizes data by YEAR.
//
// HOW TO USE:
// 1. Find the YEAR you want to edit (e.g., "2024").
// 2. Add races or drivers into that year's list.
// 3. Data is merged with the live API for that specific year.
// =====================================================================

const manualRaces = {
    "2024": [
        {
            round: 1,  // Bahrain 2024
            lapRecord: "1:31.447 - Pedro de la Rosa (2005)",
            trivia: "The 2004 race was the first in the Middle East.",
            videoId: "dQw4w9WgXcQ"
        },
        {
            round: 2, // Saudi Arabia 2024
            lapRecord: "1:30.734 - Lewis Hamilton (2021)",
            trivia: "Fastest street circuit.",
            videoId: ""
        },
        // Add more 2024 races...
    ],
    "2025": [
        {
            round: 1, // Australia 2025 (Example)
            trivia: "Season opener for 2025.",
        }
    ]
};

const manualDrivers = {
    "2024": [
        {
            number: 1, // Max Verstappen
            points: " "
        }
    ],
    "2025": [
        // Driver updates for 2025
    ]
};

module.exports = { manualRaces, manualDrivers };
