// api/download.js
import axios from "axios";

export default async function handler(req, res) {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: "No URL provided" });

    const options = {
      method: 'GET',
      url: 'https://instagram-reels-downloader-api.p.rapidapi.com/download',
      params: { url },
      headers: {
        'X-RapidAPI-Key': 'YOUR_RAPID_API_KEY_HERE',
        'X-RapidAPI-Host': 'instagram-reels-downloader-api.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);

    return res.status(200).json({
      status: "success",
      download_url: response.data.data.video_url
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Server error",
      details: error.message
    });
  }
}

