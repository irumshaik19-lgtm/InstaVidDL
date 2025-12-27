import express from "express";
import cors from "cors";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Instagram Downloader API
app.get("/download", async (req, res) => {
  const videoURL = req.query.url;
  if (!videoURL) return res.json({ error: "❌ No URL provided" });

  try {
    const api = `https://saveig.app/api/ajax?url=${encodeURIComponent(videoURL)}`;
    const response = await axios.get(api);

    if (!response.data?.url) {
      return res.json({ error: "❌ Failed to fetch. Try another IG link" });
    }

    res.json({
      download_url: response.data.url,
      message: "Download link ready 🎉"
    });

  } catch {
    res.json({ error: "❌ Server error. Try again later." });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server started on PORT: ${PORT}`));
