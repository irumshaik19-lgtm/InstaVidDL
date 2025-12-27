// api/download.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "No URL provided" });
  }

  try {
    const response = await fetch(
      `https://instagram-reels-downloader-api.p.rapidapi.com/download?url=${encodeURIComponent(url)}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": "6b00492dd5msh9acc1e3a9e2b0f2p159605jsncad9b423229c", // your key
          "x-rapidapi-host": "instagram-reels-downloader-api.p.rapidapi.com"
        }
      }
    );

    const data = await response.json();

    if (!data || !data.data || !data.data.url) {
      return res.status(500).json({ error: "Failed to fetch download link" });
    }

    return res.status(200).json({ success: true, data: data.data });

  } catch (error) {
    return res.status(500).json({
      error: "Server Error",
      details: error.message,
    });
  }
}
