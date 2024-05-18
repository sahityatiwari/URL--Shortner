const express = require("express");
const urlRouter = require("./routes/router");
const { connecttoMongoDB } = require("./connect");
const URL = require("./models/url");
const app = express();
const PORT = 3000; // Change the port number to a different one, e.g., 3000

app.use(express.json());

connecttoMongoDB("mongodb://localhost:27017/short-url")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error: ", err);
  });

app.use("/url", urlRouter); // Using the router for "/url" routes

// Handle analytics route before short URL redirect route


app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  try {
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    if (!entry) {
      return res.status(404).json({ error: 'Short URL not found' });
    }
    res.redirect(entry.redirectURL);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});



