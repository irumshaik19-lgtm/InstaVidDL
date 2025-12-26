const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const archiver = require("archiver");

const app = express();
app.use(cors());
app.use(express.json());

const ytdlp = path.join(__dirname, "yt-dlp.exe");
const tempDir = path.join(__dirname, "temp");

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

// run yt-dlp
function run(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { maxBuffer: 1024 * 1024 * 10 }, (err, stdout) => {
      if (err || !stdout) return reject();
      const media = stdout
        .split("\n")
        .map(l => l.trim())
        .filter(l => l.startsWith("http"));
      media.length ? resolve(media) : reject();
    });
  });
}

// download file
async function downloadFile(url, filepath) {
  const res = await axios({ url, method: "GET", responseType: "stream" });
  return new Promise(resolve => {
    const stream = fs.createWriteStream(filepath);
    res.data.pipe(stream);
    stream.on("finish", resolve);
  });
}

app.post("/api/download", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.json({ error: "No URL" });

  let media;
  try {
    media = await run(`"${ytdlp}" -g --no-warnings "${url}"`);
  } catch {
    try {
      media = await run(
        `"${ytdlp}" --cookies-from-browser firefox -g --no-warnings "${url}"`
      );
    } catch {
      return res.json({ error: "No media found" });
    }
  }

  // single file → direct
  if (media.length === 1) {
    return res.json({ media });
  }

  // multiple → ZIP
  const zipName = `instagram_${Date.now()}.zip`;
  const zipPath = path.join(tempDir, zipName);
  const output = fs.createWriteStream(zipPath);
  const archive = archiver("zip");

  archive.pipe(output);

  for (let i = 0; i < media.length; i++) {
    const ext = media[i].includes(".mp4") ? ".mp4" : ".jpg";
    const filePath = path.join(tempDir, `${i + 1}${ext}`);
    await downloadFile(media[i], filePath);
    archive.file(filePath, { name: `${i + 1}${ext}` });
  }

  await archive.finalize();

  output.on("close", () => {
    res.json({ zip: `http://localhost:5000/zip/${zipName}` });
  });
});

app.use("/zip", express.static(tempDir));

app.listen(5000, () => {
  console.log("✅ Server running at http://localhost:5000");
});
