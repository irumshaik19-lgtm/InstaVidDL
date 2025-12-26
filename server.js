import express from "express";
import cors from "cors";
import * as ig from "instagram-url-direct"; // correct import

const app = express();
app.use(cors());
app.use(express.json());

// Serve Frontend (index.html)
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname)); // serve index.html from root

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// API Route for Download
app.get("/download", async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.json({ error: "No URL provided" });

    const result = await ig.direct(url);
    if (!result || !result.url_list) {
      return res.json({ error: "No media found or private content" });
    }

    res.json({ url: result.url_list[0] });
  } catch (error) {
    res.json({ error: "Server Failed", details: error.message });
  }
});

// Start Server (Render uses PORT)
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Live on port ${PORT}`));
