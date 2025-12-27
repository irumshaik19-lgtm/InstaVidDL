import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "No Instagram URL provided" });

  try {
    const response = await axios.request({
      method: "GET",
      url: "https://instagram-reels-downloader-api.p.rapidapi.com/downloadReel",
      params: { url },
      headers: {
        "x-rapidapi-key": "6b00492dd5msh9acc1e3a9e2b0f2p159605jsncad9b423229c",
        "x-rapidapi-host": "instagram-reels-downloader-api.p.rapidapi.com",
        "Content-Type": "application/json"
      }
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.log("API ERROR:", err.response?.data || err.message);
    res.status(500).json({
      status: "failed",
      reason: err.response?.data || err.message
    });
  }
}
