const express = require("express");

const { handleGenerateNewShortURL, handleGetAnalytics } = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL); // Route for generating a new short URL

router.get("/analytics/:shortId", handleGetAnalytics); // Route for getting analytics for a short URL

module.exports = router;

