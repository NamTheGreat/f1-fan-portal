// =====================================================================
// 📝 MANUAL DATA EDITOR
// =====================================================================
// This file allows you to:
// 1. Add missing data (YouTube links, Lap Records, Trivia)
// 2. Override API data (Change circuit names, dates, etc.)
// 3. Create a full offline backup
//
// HOW TO USE:
// - Find the race you want to edit by 'round' number.
// - Add your data in the fields (lapRecord, videoId, etc.).
// - This data will be MERGED with the live API data.
// =====================================================================

const manualRaces = [
    {
        round: 1,  // Bahrain
        // These fields OVERRIDE the API if filled:
        // name: "Bahrain Grand Prix", 
        // circuit: "Bahrain International Circuit",

        // These fields FILL IN missing API data:
        lapRecord: "1:31.447 - Pedro de la Rosa (2005)",
        trivia: "The first F1 race in the Middle East, held in 2004.",
        videoId: "dQw4w9WgXcQ" // YouTube Video ID (e.g., https://youtu.be/dQw4w9WgXcQ)
    },
    {
        round: 2, // Saudi Arabia
        lapRecord: "1:30.734 - Lewis Hamilton (2021)",
        trivia: "The Jeddah Corniche Circuit is the fastest street circuit on the calendar.",
        videoId: ""
    },
    {
        round: 3, // Australia
        lapRecord: "1:20.260 - Charles Leclerc (2022)",
        trivia: "Held in Albert Park, it uses public roads.",
        videoId: ""
    },
    // Copy this block for other rounds (4-24)...
    {
        round: 4, // Japan
        lapRecord: "",
        trivia: "",
        videoId: ""
    }
];

const manualDrivers = [
    {
        number: 1, // Max Verstappen
        // Override or Add missing info
        // image: "https://custom-image-url.com/max.png",
        points: " "
    },
    {
        number: 44, // Lewis Hamilton
        // image: "...",
        points: " "
    }
];

module.exports = { manualRaces, manualDrivers };
