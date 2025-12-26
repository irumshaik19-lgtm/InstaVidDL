const express = require("express");
const { exec } = require("child_process");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env.PORT || 10000;

app.post("/download", (req, res) => {
  const url = req.body.url;
  if (!url) return res.status(400).send("No URL provided");

  exec(`yt-dlp -g "${url}"`, (err, stdout, stderr) => {
    if (err || !stdout.trim()) {
      console.error(stderr);
      return res.status(500).send("Server error: Failed to fetch media.");
    }
    res.send(stdout.trim());
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
