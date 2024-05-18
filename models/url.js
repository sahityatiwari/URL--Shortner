const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true, // Corrected capitalization
  },
  redirectURL: {
    type: String,
    required: true,
  },
  visitHistory: [{
    ip: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
});

const URL = mongoose.model("URL", urlSchema); // Changed model name to "URL"
module.exports = URL;
