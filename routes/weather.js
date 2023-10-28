// Import the required Express.js library
const express = require('express');

// Create an Express Router
const router = express.Router();

// Define a GET route for the root path ('/')
router.get('/', async (req, res) => {
    // Render the 'weather' view
    res.render('weather');
});

// Export the router to make it available to other parts of the application
module.exports = router;
