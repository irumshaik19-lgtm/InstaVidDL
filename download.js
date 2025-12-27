// Vercel Serverless API for Instagram Downloader
import axios from "axios";

export default async function handler(req, res) {
  const url = req.query.url;

  if (!url) return res.status(400).json({ error: "❌ No URL provided" });

  try {
    // Instagram request headers to avoid 403
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept-Language": "en-US,en;q=0.9",
      }
    });

    // Here we return HTML (page source) for now
    // We can extract media URL next
    return res.status(200).json({
      status: "success",
      message: "Fetched successfully!",
      data: response.data.slice(0, 200) + "...(trimmed)"
    });

  } catch (err) {
    return res.status(500).json({
      error: "❌ Fetch failed",
      details: err.message
    });
  }
}
