// ====== Instagram Downloader Server ======
import express from "express";
import cors from "cors";
import instaDL from "instagram-url-direct";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/download", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "No URL provided" });

    console.log("📥 Requested URL:", url);

    // Get Instagram media links (photo/video/reel)
    const result = await instaDL(url);

    if (!result || result.length === 0) {
      return res.status(404).json({ error: "No media found" });
    }

    return res.json({
      success: true,
      media: result, // returns photo/reel/video direct links
    });

  } catch (error) {
    console.error("❌ Server Error:", error);
    return res.status(500).json({ error: "Server error while processing request" });
  }
});

app.get("/", (req, res) => {
  res.send("🚀 Instagram Downloader Server Running!");
});

// ====== PORT SETUP FOR RENDER ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server Running on PORT: ${PORT}`);
});
