// api/download.js
import axios from "axios";

export default async function handler(req, res) {
  const reelUrl = req.query.url;

  if (!reelUrl) {
    return res.status(400).json({ status: "error", message: "❌ URL is required" });
  }

  try {
    const response = await axios.get(
      "https://instagram-reels-downloader-api.p.rapidapi.com/downloadReel",
      {
        params: { url: reelUrl },
        headers: {
          "x-rapidapi-key": "6b00492dd5msh9acc1e3a9e2b0f2p159605jsncad9b423229c",
          "x-rapidapi-host": "instagram-reels-downloader-api.p.rapidapi.com",
        },
      }
    );

    // Check if valid data exists
    if (!response.data || !response.data.data) {
      return res.status(500).json({ status: "error", message: "Invalid response from API" });
    }

    return res.status(200).json({
      status: "success",
      data: response.data.data,
    });

  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Server failed to fetch",
      details: err.response?.data || err.message,
    });
  }
}
