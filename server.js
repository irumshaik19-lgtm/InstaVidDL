import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

const RAPID_API_KEY = "6b00492dd5msh9acc1e3a9e2b0f2p159605jsncad9b423229c"; // <-- YOUR KEY

app.get("/", (req, res) => {
  res.send("🚀 InstaVidDL API Live & Running!");
});

app.get("/download", async (req, res) => {
  const reelUrl = req.query.url;
  
  if (!reelUrl) return res.status(400).json({ error: "❌ No URL provided" });

  try {
    const apiURL = `https://instagram-reels-downloader-api.p.rapidapi.com/download?url=${encodeURIComponent(reelUrl)}`;
    
    const response = await axios.get(apiURL, {
      headers: {
        "x-rapidapi-host": "instagram-reels-downloader-api.p.rapidapi.com",
        "x-rapidapi-key": RAPID_API_KEY
      }
    });

    return res.json({ download_url: response.data.url, success: true });

  } catch (error) {
    console.log("API ERROR:", error.response?.data || error.message);
    return res.status(500).json({
      error: "❌ Server Error - Instagram blocked direct request",
      details: error.response?.data || error.message
    });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
