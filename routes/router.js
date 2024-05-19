const express = require("express");
const URL = require("../models/url");
const { handleGenerateNewShortURL } = require("../controllers/url"); // Import the controller function
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allUrls = await URL.find({});
        const hasUrls = allUrls.length > 0; // Check if there are any URLs
        return res.render("home", {
            urls: allUrls,
            hasUrls: hasUrls // Pass the boolean to the view
        });
    } catch (error) {
        console.error("Error fetching URLs: ", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post("/delete-all", async (req, res) => {
    try {
        await URL.deleteMany({});
        return res.redirect("/");
    } catch (error) {
        console.error("Error deleting URLs: ", error); // Enhanced logging
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add the POST route handler for URL generation
router.post("/", handleGenerateNewShortURL);

module.exports = router;
