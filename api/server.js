// server.js - Backend API for Instagram Downloader
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("🚀 InstaVidDL API Live & Running for Public Use!");
});

app.get("/download", async (req, res) => {
  const reelUrl = req.query.url;
  if (!reelUrl) return res.status(400).json({ error: "❌ URL missing" });

  try {
    const response = await axios.get(
      "https://instagram-reels-downloader-api.p.rapidapi.com/download",
      {
        params: { url: reelUrl },
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,  // <-- FROM VERCEL ENV
          "x-rapidapi-host": "instagram-reels-downloader-api.p.rapidapi.com",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "❌ Failed to fetch download link",
      details: error.message,
    });
  }
});

// Required export for Vercel
export default app;


