const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
    console.log(req.body); // Log the incoming request body
    try {
        const { username, email, password } = req.body;
        // Check for missing fields
        if (!username || !email || !password) {
            return res.status(400).json({ status: false, message: 'All fields are required.' });
        }
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully.', user_id: user._id });
    } catch (error) {
        console.error(error); // Log the error
        res.status(400).json({ status: false, message: error.message });
    }
});

// Add any other routes for login, etc. below

module.exports = router;
