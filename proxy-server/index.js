const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Configuration
const PORT = 3000;
const HOST = "localhost";
var API_SERVICE_URL = "http://localhost:5000";

// Logging
app.use('*', morgan('dev'));

// Get versionEndpoint from request & add it to API_SERVICE_URL
// app.use('*', (req, res, next) => {
//     API_SERVICE_URL = req.headers.redirect; // This is wrong!
//     next();
// });


app.use('*', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
}));

// Start Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});