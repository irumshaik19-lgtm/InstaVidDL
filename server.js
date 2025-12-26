const ytdlp = "yt-dlp"; // Linux binary

app.post("/download", (req, res) => {
  const url = req.body.url;
  if (!url) return res.status(400).send("No URL provided");

  exec(`${ytdlp} -g "${url}"`, (error, stdout, stderr) => {
    if (error || !stdout) {
      return res.status(500).send("Failed to fetch media.");
    }
    return res.send(stdout.trim());
  });
});
