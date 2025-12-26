const express = require("express");
const cors = require("cors");
const { ytdlp } = require("node-yt-dlp");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/download", async (req, res) => {
  const url = req.body.url;
  if (!url) return res.status(400).send("No URL provided");

  try {
    const result = await ytdlp(url, { dumpSingleJson: true });

    if (!result || !result.url) {
      return res.status(500).send("Media not found (might be private)");
    }

    return res.send(result.url);

  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error: Unable to fetch media");
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("🚀 Running on port", PORT));


