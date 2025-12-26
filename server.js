const express = require("express");
const cors = require("cors");
const ytdlp = require("yt-dlp-exec");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/download", async (req, res) => {
  const url = req.body.url;
  if (!url) return res.status(400).send("No URL provided");

  try {
    const result = await ytdlp(url, { dumpSingleJson: true });
    
    if (!result || !result.url) {
      return res.status(500).send("Media not found (Maybe private?)");
    }

    return res.send(result.url);
  } catch (error) {
    console.log("❌ ERROR:", error.stderr || error);
    return res.status(500).send("Server error: failed to fetch media");
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("🚀 Server running on port", PORT));



