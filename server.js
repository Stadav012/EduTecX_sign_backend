const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());

const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

// Or configure CORS to allow specific origin
app.use(
    cors({
        origin: 'https://edutecxsignlanguage.vercel.app/', // Your frontend URL
        methods: 'GET,POST,PUT,DELETE',
        allowedHeaders: 'Content-Type,Authorization',
    })
);

// Connect to MongoDB
mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB connection error: ', err));

// Routes
app.use('/api/auth', authRoutes.router);
app.use('/api/paths', require('./routes/pathRoutes'));
app.use('/api/lessons', require('./routes/lessonRoutes'));

// Export app as the handler for Vercel's serverless function
module.exports = app;
