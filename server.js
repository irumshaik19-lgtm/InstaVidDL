import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

// 🔑 PUT YOUR RAPIDAPI KEY HERE
const API_KEY = "PASTE_YOUR_RAPIDAPI_KEY";
const API_HOST = "instagram-reels-downloader-api.p.rapidapi.com";

// 🌍 Home Route
app.get("/", (req, res) => {
  res.send("🚀 InstaVidDL API Live & Running!");
});

// 📥 Download Route
app.get("/download", async (req, res) => {
  const reelURL = req.query.url;
  if (!reelURL) return res.json({ error: "❌ No URL provided" });

  try {
    const response = await axios.get(
      `https://${API_HOST}/download?url=${encodeURIComponent(reelURL)}`,
      {
        headers: {
          "x-rapidapi-host": API_HOST,
          "x-rapidapi-key": API_KEY,
        },
      }
    );

    return res.json({
      status: "success",
      download_url: response.data.download_url,
    });

  } catch (error) {
    return res.json({
      status: "error",
      message: "❌ Failed to fetch download link",
      details: error.message,
    });
  }
});

// 🚀 Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on PORT ${PORT}`));
