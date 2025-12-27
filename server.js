import express from "express";
import cors from "cors";
import instagramGetUrl from "instagram-downloader";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("🚀 Insta Downloader Server Running Successfully!");
});

app.get("/download", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "❌ No URL provided" });

  try {
    const result = await instagramGetUrl(url);
    return res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "⚠️ Failed to fetch. Try another link." });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Running on PORT ${PORT}`));
