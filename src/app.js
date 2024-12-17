const express = require("express");
const app = express();

// Basic route to check the backend is running
app.get("/", (req, res) => {
    res.send("Express on Vercel is working!");
});

module.exports = app; // Export the app
