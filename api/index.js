// api/index.js
import axios from "axios";

export default async function handler(req, res) {

  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.status(400).json({ status: "error", message: "No URL provided" });
  }

  try {
    const response = await axios.get(
      "https://instagram-reels-downloader-api.p.rapidapi.com/download",
      {
        params: { url: videoUrl },
        headers: {
          "x-rapidapi-key": "6b00492dd5msh9acc1e3a9e2b0f2p159605jsncad9b423229c",
          "x-rapidapi-host": "instagram-reels-downloader-api.p.rapidapi.com"
        }
      }
    );

    return res.status(200).json({
      status: "success",
      download: response.data.url, // direct video link
      raw: response.data
    });

  } catch (error) {
    console.log("API ERROR:", error.response?.data || error.message);
    return res.status(500).json({
      status: "error",
      message: "RapidAPI request failed",
      details: error.response?.data || error.message
    });
  }
}
