const getDrivers = (req, res) => {
    const drivers = [
        {
            id: 1,
            name: 'Max Verstappen',
            team: 'Red Bull Racing',
            country: 'Netherlands',
            number: 1,
            points: 58,
            image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col/image.png'
        },
        {
            id: 2,
            name: 'Sergio Perez',
            team: 'Red Bull Racing',
            country: 'Mexico',
            number: 11,
            points: 40,
            image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png.transform/2col/image.png'
        },
        {
            id: 3,
            name: 'Charles Leclerc',
            team: 'Ferrari',
            country: 'Monaco',
            number: 16,
            points: 38,
            image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col/image.png'
        },
        {
            id: 4,
            name: 'Carlos Sainz',
            team: 'Ferrari',
            country: 'Spain',
            number: 55,
            points: 30,
            image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/2col/image.png'
        },
        {
            id: 5,
            name: 'Lando Norris',
            team: 'McLaren',
            country: 'United Kingdom',
            number: 4,
            points: 28,
            image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col/image.png'
        }
    ];

    res.status(200).json(drivers);
};

module.exports = { getDrivers };
