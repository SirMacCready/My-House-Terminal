const express = require('express');
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');
const indexRoute = require("./routes/index");
const headerRoute = require("./routes/header");
const homestockRoute = require("./routes/HomeStock");
const weatherRoute = require("./routes/weather");
// Configure static file serving with the correct path


// Define your routes independently
app.get('/', (req, res) => {
    res.render('index');
});

// Use the app.use() method to mount the routes
app.use(express.static("public"));
app.use(express.static("src"));
app.use(express.static("routes"));
app.use("/index", indexRoute);
app.use("/header", headerRoute);
app.use("/HomeStock", homestockRoute);
app.use("/weather", weatherRoute);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});