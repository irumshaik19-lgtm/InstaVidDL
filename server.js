import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

const API_HOST = "instagram-downloader-download-instagram-videos.p.rapidapi.com";
const API_KEY = "YOUR_RAPIDAPI_KEY_HERE";  // <= UPDATE THIS

app.get("/", (req, res) => {
  res.send("🚀 InstaVidDL API Live & Running for Public Use!");
});

app.get("/download", async (req, res) => {
  const reelURL = req.query.url;

  if (!reelURL) return res.json({ error: "❌ No URL provided" });

  try {
    const response = await axios.get(
      `https://${API_HOST}/index?url=${encodeURIComponent(reelURL)}`,
      {
        headers: {
          "x-rapidapi-host": API_HOST,
          "x-rapidapi-key": API_KEY,
        },
      }
    );

    res.json({
      status: "success",
      download_url: response.data.media,
    });

  } catch (error) {
    res.json({
      status: "error",
      message: "❌ Cannot fetch video (API blocked / bad link / limit exceeded)",
      details: error.message,
    });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on PORT ${PORT}`));
