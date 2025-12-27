// api/index.js
import axios from "axios";

export default async function handler(req, res) {
  const videoUrl = req.query.url; 
  if (!videoUrl) {
    return res.status(400).json({ status: "error", message: "No URL provided" });
  }

  try {
    const options = {
      method: 'GET',
      url: 'https://instagram-reels-downloader-api.p.rapidapi.com/download',
      params: { url: videoUrl },
      headers: {
        'x-rapidapi-key': '6b00492dd5msh9acc1e3a9e2b0f2p159605jsncad9b423229c', 
        'x-rapidapi-host': 'instagram-reels-downloader-api.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    return res.status(200).json({ status: "success", data: response.data });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Server error from API",
      details: error.message
    });
  }
}
