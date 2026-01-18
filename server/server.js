const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const connectDB = async () => {
    if (process.env.USE_MOCK_DB === 'true') {
        console.log('Using Mock Database (In-Memory)');
        return;
    }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/f1fanportal');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/races', require('./routes/raceRoutes'));
app.use('/api/drivers', require('./routes/driverRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));

app.get('/', (req, res) => {
    res.send('F1 Fan Portal API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
