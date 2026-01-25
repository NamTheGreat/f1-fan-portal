// MANUAL DATA OVERRIDE
// Use this file to provide custom data when USE_MANUAL_DATA is set to true in controllers.

const manualRaces = [
    {
        id: 1,
        round: 1,
        name: "Bahrain Grand Prix",
        circuit: "Bahrain International Circuit",
        country: "Bahrain",
        date: "2024-03-02",
        format: "conventional"
    },
    {
        id: 2,
        round: 2,
        name: "Saudi Arabian Grand Prix",
        circuit: "Jeddah Corniche Circuit",
        country: "Saudi Arabia",
        date: "2024-03-09",
        format: "conventional"
    },
    // Add more races here...
];

const manualDrivers = [
    {
        id: 1,
        number: 1,
        name: "Max Verstappen",
        team: "Red Bull Racing",
        country: "NED",
        image: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col/image.png",
        points: " " 
    },
    {
        id: 11,
        number: 11,
        name: "Sergio Perez",
        team: "Red Bull Racing",
        country: "MEX",
        image: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png.transform/2col/image.png",
        points: " "
    },
    // Add more drivers here...
];

module.exports = { manualRaces, manualDrivers };
