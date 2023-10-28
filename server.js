// Import the required Express.js library
const express = require('express');
const app = express();

// Set the view engine to EJS
const ejs = require('ejs');
app.set('view engine', 'ejs');

// Import route modules for different parts of the application
const indexRoute = require("./routes/index");
const headerRoute = require("./routes/header");
const homestockRoute = require("./routes/HomeStock");
const weatherRoute = require("./routes/weather");

// Configure static file serving with the correct path

// Define a route for the root path ('/') that renders the 'index' view
app.get('/', (req, res) => {
    res.render('index');
});

// Use the app.use() method to serve static files from specified directories
app.use(express.static("public"));
app.use(express.static("src"));
app.use(express.static("routes"));

// Mount route handlers for specific paths
app.use("/index", indexRoute);
app.use("/header", headerRoute);
app.use("/HomeStock", homestockRoute);
app.use("/weather", weatherRoute);

// Start the Express application, listening on port 4000
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
