// server.js (FINAL WORKING RAPIDAPI VERSION)
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

// 🔑 PUT YOUR RAPIDAPI KEY & HOST HERE
const RAPIDAPI_KEY = "6b00492dd5msh9acc1e3a9e2b0f2p159605jsncad9b423229c";
const RAPIDAPI_HOST = "instagram-reels-downloader-api.p.rapidapi.com";

// 🟢 HOME ROUTE
app.get("/", (req, res) => {
  res.send("🚀 InstaVidDL API Live & Running!");
});

// 🔥 DOWNLOAD ROUTE
app.get("/download", async (req, res) => {
  const reelUrl = req.query.url;
  if (!reelUrl) return res.status(400).json({ error: "❌ No URL provided" });

  try {
    const options = {
      method: "GET",
      url: `https://${RAPIDAPI_HOST}/download`,
      params: { url: reelUrl },
      headers: {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": RAPIDAPI_HOST,
      },
    };

    const response = await axios.request(options);
    return res.json(response.data);
  } catch (error) {
    console.error("❌ API ERROR:", error?.message);
    return res.status(500).json({
      error: "❌ Failed to fetch download link",
      details: error?.response?.data || "Unknown error",
    });
  }
});

// 🚀 START SERVER
app.listen(PORT, () => console.log(`🚀 Server running on PORT: ${PORT}`));
