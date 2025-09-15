// Redirect to login if not logged in
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  window.location.href = "index.html";
}

async function checkLink() {
  const url = document.getElementById("urlInput").value;
  const result = document.getElementById("result");
  const scoreLabel = document.getElementById("scoreLabel");
  const scoreFill = document.getElementById("scoreFill");
  const historyList = document.getElementById("historyList");

  if (!url) {
    result.textContent = "❌ Please enter a URL.";
    result.style.color = "red";
    return;
  }

  try {
    const response = await fetch('https://fishguard.onrender.com/api/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    const data = await response.json();

    // Use the correct fields from backend
    scoreLabel.textContent = `Phishing Confidence: ${data.score}%`;
    scoreFill.style.width = data.score + "%";

    let color = "green";
    let message = "✅ Looks Safe.";
    if (data.score >= 70) {
      color = "red";
      message = "🚨 Suspicious Link Detected!";
    } else if (data.score >= 30) {
      color = "orange";
      message = "⚠️ Possibly Suspicious.";
    }
    result.textContent = message;
    result.style.color = color;

    // Add to history
    const li = document.createElement("li");
    li.textContent = `${url} → ${message}`;
    historyList.prepend(li);
    if (historyList.children.length > 5) {
      historyList.removeChild(historyList.lastChild);
    }
  } catch (err) {
    result.textContent = "Server error!";
    result.style.color = "red";
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  alert("Logged out successfully!");
  window.location.href = "index.html";
}

//# sourceMappingURL=client.js.map