const express = require('express');
const morgan = require("morgan");

// Create Express Server
const app = express();

// Configuration
const PORT = 5000;
const HOST = "localhost";

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is the target server.');
});

app.get('*', (req, res, next) => {
    res.json({message: 'Request successful!'});
});


// Start Server
app.listen(PORT, HOST, () => {
    console.log(`Starting Server at ${HOST}:${PORT}`);
});