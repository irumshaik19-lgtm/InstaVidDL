const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ⬇️  ENTER YOUR VALUES HERE
const API_URL = "https://social-media-video-downloader.p.rapidapi.com/youtube/v3/video/details";
const API_KEY = "YOUR_RAPIDAPI_KEY_HERE";
const API_HOST = "social-media-video-downloader.p.rapidapi.com";
// ⬆️ Copy those from RapidAPI panel

app.post("/download", async (req, res) => {
  const videoUrl = req.body.url;
  if (!videoUrl) return res.status(400).send("No URL provided");

  try {
    const response = await axios.get(API_URL, {
      params: {
        url: videoUrl
      },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST
      }
    });

    return res.json(response.data);

  } catch (error) {
    console.error(error.response?.data || error);
    return res.status(500).send("Server error: Could not fetch media.");
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



