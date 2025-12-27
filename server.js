import express from "express";
import cors from "cors";
import instagramGetUrl from "instagram-downloader";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Insta Downloader Server Running Successfully!");
});

app.get("/download", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "❌ No URL provided" });

  try {
    const media = await instagramGetUrl(url);
    res.json({ success: true, media });
  } catch (error) {
    console.error("❌ Download failed:", error.message);
    res.status(500).json({ error: "⚠️ Failed to fetch media. Try another link." });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on PORT ${PORT}`));
