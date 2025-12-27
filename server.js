import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 10000;

// ⬅️ REPLACE THESE WITH YOUR OWN KEYS
const RAPID_URL = "https://instagram-reels-downloader-api.p.rapidapi.com/download";
const RAPID_KEY = "6b00492dd5msh9acc1e3a9e2b0f2p159605jdnscad9b423229c"; // your key
const RAPID_HOST = "instagram-reels-downloader-api.p.rapidapi.com";

app.get("/", (req, res) => {
  res.send("🚀 InstaVidDL API Live & Working!");
});

app.get("/download", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "❌ No URL provided" });

  try {
    const response = await axios.get(`${RAPID_URL}?url=${encodeURIComponent(url)}`, {
      headers: {
        "x-rapidapi-key": RAPID_KEY,
        "x-rapidapi-host": RAPID_HOST
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "❌ Server error", details: error.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on PORT ${PORT}`));
