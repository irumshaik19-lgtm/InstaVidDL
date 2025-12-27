import express from "express";
import cors from "cors";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());

// Needed to get the correct file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the homepage (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// API Endpoint
app.get("/download", async (req, res) => {
  const videoURL = req.query.url;
  if (!videoURL) return res.json({ error: "❌ No URL provided" });

  try {
    const api = `https://ssyoutube.com/api/convert?url=${encodeURIComponent(videoURL)}`;
    const response = await axios.get(api);

    if (!response.data.url) return res.json({ error: "❌ Could not fetch download link" });

    res.json({
      download_url: response.data.url,
      message: "Download link generated successfully"
    });

  } catch (error) {
    res.json({ error: "❌ Server error. Try another link" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server started on PORT: ${PORT}`));
