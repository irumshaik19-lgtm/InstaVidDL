import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/download", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "No URL provided" });

  try {
    // Placeholder: later we add scraper or API here
    return res.json({ success: true, video: url });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch video" });
  }
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));

