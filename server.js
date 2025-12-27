import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 InstaVidDL API Live & Running!");
});

app.get("/download", async (req, res) => {
  const reelUrl = req.query.url;
  if (!reelUrl) return res.status(400).json({ error: "❌ No URL provided" });

  try {
    const options = {
      method: "GET",
      url: "https://instagram-reels-downloader-api.p.rapidapi.com/download",
      params: { url: reelUrl },
      headers: {
        "X-RapidAPI-Key": "6b00492dd5msh9acc1e3a9e2b0f2p159605jsncad9b423229c",
        "X-RapidAPI-Host": "instagram-reels-downloader-api.p.rapidapi.com"
      }
    };

    const response = await axios.request(options);

    // Extract final link
    const downloadURL =
      response.data?.download_url ||
      response.data?.links?.[0]?.url ||
      null;

    if (!downloadURL) {
      return res.status(403).json({
        error: "❌ Failed to fetch download link",
        details: "API did not return a valid link"
      });
    }

    return res.json({ download_url: downloadURL });

  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "❌ Server error",
      details: error.response?.data || error.message
    });
  }
});

// Render port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on PORT: ${PORT}`));
