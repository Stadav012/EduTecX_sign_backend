const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error: ', err);
        process.exit(1); // Exit the process if the connection fails
    }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes.router);
app.use('/api/paths', require('./routes/pathRoutes'));
app.use('/api/lessons', require('./routes/lessonRoutes'));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
