const express = require("express");
const path = require("path");
const { imageRoute } = require("./routes/imageRoute"); // Separate routes into files

const app = express();

// Serve static files from React's build folder
app.use(express.static(path.join(__dirname, "../admin", "build")));

// API Route example
app.get("/api", (req, res) => {
    res.json({ message: "Hello from Express API!" });
});

// Image route to fetch image from Google Drive
app.use("/image", imageRoute); // Use the imageRoute

// For any other route, serve the React app's index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin", "build", "index.html"));
});

module.exports = app;
