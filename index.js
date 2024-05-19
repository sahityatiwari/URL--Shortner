const express = require("express");
const path = require("path");
const { connecttoMongoDB } = require("./connect");
const URL = require("./models/url");

const urlRouter = require("./routes/router");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connecttoMongoDB("mongodb://localhost:27017/short-url")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error: ", err);
  });

app.use("/static", staticRouter);
app.use("/user", userRouter);
app.use("/url", urlRouter);

app.get('/', async (req, res) => {
  try {
    const allUrls = await URL.find({});
    const hasUrls = allUrls.length > 0;
    return res.render("home", {
      urls: allUrls,
      hasUrls: hasUrls
    });
  } catch (error) {
    console.error("Error fetching URLs: ", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/signup", (req, res) => {
  return res.render("signup");
});

app.get("/login", (req, res) => {
  return res.render("login");
});

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
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
