// server.js
const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/mongoDB');  // Import the MongoDB connection
const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

// Connect to MongoDB
connectDB();

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        status: false,
        message: err.message || 'Internal Server Error'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
