const express = require("express");
const path = require("path"); // Import the path module

const app = express();

// Serve static files from React's build folder
app.use(express.static(path.join(__dirname, "../admin", "build")));

// API Route example
app.get("/api", (req, res) => {
    res.json({ message: "Hello from Express API!" });
});

// For any other route, serve the React app's index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin", "build", "index.html"));
});

// Start the server


module.exports = app; // Export the app
