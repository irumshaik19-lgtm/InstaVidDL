document.getElementById("downloadBtn").addEventListener("click", async () => {
    let url = document.getElementById("inputUrl").value.trim();
    if (!url) return alert("⚠️ Enter Instagram URL!");

    try {
        const res = await fetch(`https://insta-vid-dl-b4d1.vercel.app/api/download?url=${encodeURIComponent(url)}`);
        const data = await res.json();

        if (data.status === "success" && data.download) {
            window.open(data.download, "_blank");
        } else {
            alert("❌ Error: " + (data.message || "Try another link"));
        }
    } catch (error) {
        alert("❌ Server error. Try again later.");
        console.error(error);
    }
});
