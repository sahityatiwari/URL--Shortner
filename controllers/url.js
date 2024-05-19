const shortid = require("shortid");
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({
      error: 'url is required'
    });
  }

  const shortId = shortid.generate();

  try {
    await URL.create({
      shortId: shortId,
      redirectURL: body.url,
      visitHistory: [],
    });

    const allUrls = await URL.find({});
    const hasUrls = allUrls.length > 0;
    return res.render("home", {
      id: shortId,
      urls: allUrls,
      hasUrls: hasUrls
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  try {
    const result = await URL.findOne({ shortId });
    if (!result) {
      return res.status(404).json({ error: 'Short URL not found' });
    }
    return res.json({
      totalclicks: result.visitHistory.length,
      analytics: result.visitHistory
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics
};
