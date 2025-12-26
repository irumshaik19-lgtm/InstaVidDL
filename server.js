import express from "express";
import cors from "cors";
import igdl from "instagram-url-direct"; // CORRECT IMPORT

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/download", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "No URL provided" });

    const result = await igdl(url); 

    if (!result || !result.url_list?.length) {
      return res.status(404).json({ error: "No media found" });
    }

    res.json({ download: result.url_list[0] });
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: "Failed to process URL" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
