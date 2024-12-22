const axios = require("axios");

// Controller function to fetch an image from Google Drive
const getImageFromGoogleDrive = async (req, res) => {
    const fileId = req.params.fileId;
    try {
        const imageUrl = `https://drive.google.com/uc?id=${fileId}`;
        const response = await axios.get(imageUrl, { responseType: 'stream' });
        res.set('Content-Type', response.headers['content-type']);
        response.data.pipe(res);
    } catch (error) {
        res.status(500).send('Error fetching image from Google Drive');
    }
};

module.exports = { getImageFromGoogleDrive };
