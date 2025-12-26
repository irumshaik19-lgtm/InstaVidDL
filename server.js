import express from "express";
import cors from "cors";
import { instagram } from "instagram-url-direct"; // <-- FIXED HERE

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/download", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "No URL provided" });

    const result = await instagram(url); // <-- Correct usage
    if (!result || !result.url_list?.length) {
      return res.status(404).json({ error: "No media found" });
    }

    res.json({ download: result.url_list[0] });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error", details: error.toString() });
  }
});

// Render will inject PORT automatically
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port: ${PORT}`));
