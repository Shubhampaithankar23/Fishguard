const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Simple feature extraction and scoring
function scoreUrl(url) {
  let score = 0;
  const lowerUrl = url.toLowerCase();

  if (lowerUrl.includes("login") || lowerUrl.includes("verify")) score += 40;
  if (lowerUrl.includes("free") || lowerUrl.includes("prize")) score += 30;
  if (!lowerUrl.startsWith("https")) score += 20;
  if (lowerUrl.length > 50) score += 10;
  if (lowerUrl.includes('@')) score += 20;
  if (lowerUrl.match(/(\d{1,3}\.){3}\d{1,3}/)) score += 20; // IP address
  if (lowerUrl.includes('%')) score += 10;

  if (score > 100) score = 100;
  return score;
}

app.post('/api/check', (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const score = scoreUrl(url);
  let message = "";
  if (score >= 70) {
    message = "Suspicious";
  } else if (score >= 30) {
    message = "Possibly Suspicious";
  } else {
    message = "Safe";
  }

  res.json({ score, message });
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Optional: Serve index.html for all unknown routes (for SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});