const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Simple route
app.get("/", (req, res) => {
  res.send("Backend is running successfully on Vercel!");
});

// Health check route
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

// Start the server (only for local testing)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export app for Vercel
module.exports = app;
