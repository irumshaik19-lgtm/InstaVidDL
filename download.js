<script>
async function downloadMedia() {
    const url = document.getElementById("instaUrl").value.trim();
    const error = document.getElementById("error");
    const result = document.getElementById("result");

    if(!url){ error.textContent = "❌ Please enter a URL"; return; }
    error.textContent = "⏳ Fetching download link...";

    try {
        const API = "https://insta-vid-dl-b4d1.vercel.app/api/server";
        const response = await fetch(`${API}?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if(data.url){
            error.textContent = "";
            result.innerHTML = `
                <div class="download-box">
                    <h3>✅ Download Ready!</h3>
                    <a href="${data.url}" target="_blank">⬇ Download Video</a>
                </div>`;
        } else {
            error.textContent = "❌ Not able to fetch this link. Try another.";
        }
    } catch {
        error.textContent = "❌ Server error. Check Vercel logs.";
    }
}
</script>
