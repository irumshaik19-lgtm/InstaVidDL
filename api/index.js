
// api/index.js
import axios from "axios";

export default async function handler(req, res) {
  const reelUrl = req.query.url;
  if (!reelUrl) return res.status(400).json({ error: "No URL provided" });

  try {
    const response = await axios.get(
      `https://instagram-reels-downloader-api.p.rapidapi.com/downloadReel?url=${reelUrl}`,
      {
        headers: {
          "X-RapidAPI-Key": "YOUR_KEY_HERE",
          "X-RapidAPI-Host": "instagram-reels-downloader-api.p.rapidapi.com",
        },
      }
    );

    return res.status(200).json(response.data);

  } catch (error) {
    return res.status(500).json({ error: "Server Error", details: error.message });
  }
}
