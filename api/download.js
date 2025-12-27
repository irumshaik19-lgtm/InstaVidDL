// api/download.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "No Instagram URL provided" });

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "6b00492dd5msh9acc1e3a9e2b0f2p159605jsncad9b423229c",
      "x-rapidapi-host": "instagram-downloader-scraper-reels-igtv-posts-stories.p.rapidapi.com"
    }
  };

  try {
    const apiUrl = `https://instagram-downloader-scraper-reels-igtv-posts-stories.p.rapidapi.com/ping?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl, options);
    const data = await response.json();

    if (!data || !data.links || data.links.length === 0) {
      return res.status(404).json({ error: "No downloadable media found" });
    }

    // Send first downloadable link
    return res.status(200).json({ success: true, download: data.links[0] });

  } catch (error) {
    return res.status(500).json({ error: "API request failed", details: error.message });
  }
}
