import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

const API_KEY = "6b00492dd5msh9acc1e3a9e2b0f2p159605jsncad9b423229c"; // PUT YOUR KEY
const API_HOST = "instagram-reels-downloader-api.p.rapidapi.com"; // HOST FROM RAPIDAPI

app.get("/", (req, res) => {
  res.send("🚀 InstaVidDL API Live & Running for Public Use!");
});

app.get("/download", async (req, res) => {
  const reelURL = req.query.url;
  if (!reelURL) return res.json({ error: "❌ No URL provided" });

  try {
    const response = await axios.get(
      `https://${API_HOST}/download?url=${encodeURIComponent(reelURL)}`,
      {
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": API_HOST,
        },
      }
    );

    return res.json({ status: "success", data: response.data });
  } catch (error) {
    return res.json({
      status: "error",
      message: "❌ Failed to fetch",
      details: error.response?.status || error.message,
    });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on PORT ${PORT}`));
