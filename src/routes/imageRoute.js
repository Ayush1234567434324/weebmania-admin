const express = require("express");
const { getImageFromGoogleDrive } = require("../controllers/imageController");
const router = express.Router();

// Image route to fetch image from Google Drive using the controller
router.get('/:fileId', getImageFromGoogleDrive);

module.exports = { imageRoute: router };
