import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("🚀 InstaVidDL API Live & Running for Public Use!");
});

// Download Route
app.get("/api/download", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ status: "error", message: "❌ URL missing" });

  try {
    const options = {
      method: "GET",
      url: "https://instagram-reels-downloader-api.p.rapidapi.com/downloadReel",
      params: { url },
      headers: {
        "x-rapidapi-key": "6b00492dd5msh9acc1e3a9e2b0f2p159605jsncad9b423229c",
        "x-rapidapi-host": "instagram-reels-downloader-api.p.rapidapi.com"
      }
    };

    const response = await axios.request(options);

    // Check if video exists
    if (response.data?.data?.video) {
      return res.json({
        status: "success",
        download: response.data.data.video
      });
    }

    return res.status(500).json({ status: "error", message: "❌ No video found" });

  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "❌ Failed to fetch",
      details: err.response?.data || err.message
    });
  }
});

export default app;
