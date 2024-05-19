const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/signup", (req, res) => {
    return res.render("signup");
});
router.get("/login", (req, res) => {
    return res.render("login");
});
router.get('/test', async (req, res) => {
    try {
        const allUrls = await URL.find({});
        return res.render("home", {
            urls: allUrls,
        });
    } catch (error) {
        console.error("Error fetching URLs: ", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
