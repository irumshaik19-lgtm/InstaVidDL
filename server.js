import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

// ====== Instagram Download API ======
const API_URL = "https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/index";
const API_HOST = "instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com";
const API_KEY = "YOUR_RAPIDAPI_KEY_HERE"; // ⚠️ paste your RapidAPI key here

app.get("/download", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json({ error: "❌ No URL provided" });

  try {
    const response = await axios.get(API_URL, {
      params: { url },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST
      }
    });

    return res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.json({ error: "⚠ Server failed. URL might be private/blocked." });
  }
});

// ====== Home Route (Fixes 'Cannot GET /') ======
app.get("/", (req, res) => {
  res.send("🚀 Insta Downloader Server Running Successfully!");
});

// ====== Render / Production Port ======
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server started on PORT: ${PORT}`));
