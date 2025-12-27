import express from "express";
import cors from "cors";
import { instagram } from "instagram-url-direct";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("🚀 Backend is Live");
});

app.get("/download", async (req, res) => {
  const url = req.query.url;
  if(!url) return res.json({ error: "No URL provided" });

  try {
    const data = await instagram(url);

    if (!data || !data.url_list || data.url_list.length === 0) {
      return res.json({ error: "No media found. Private/blocked link?" });
    }

    res.json({
      download_url: data.url_list[0],
      all_urls: data.url_list
    });

  } catch(err) {
    res.json({ error: "Failed to fetch Instagram media" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("🚀 Server running on port " + PORT));
