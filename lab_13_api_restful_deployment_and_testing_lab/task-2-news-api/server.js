const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4001;

// Valid country codes supported by GNews
const SUPPORTED_COUNTRIES = [
  "au", "br", "ca", "cn", "eg", "fr", "de", "gr", "hk", "in",
  "ie", "il", "it", "jp", "nl", "no", "pk", "pe", "ph", "pt",
  "ro", "ru", "sg", "es", "se", "ch", "tw", "ua", "gb", "us"
];

app.get("/api/news/:country", async (req, res) => {
  const { country } = req.params;
  const countryCode = country.toLowerCase();

  // Validate country code before calling API
  if (!SUPPORTED_COUNTRIES.includes(countryCode)) {
    return res.status(400).json({
      error: `Invalid country code: "${country}". Supported codes include: us, gb, pk, in, de, fr, au, ca, jp, cn, etc.`
    });
  }

  const apiKey = process.env.GNEWS_API_KEY;

  try {
    const response = await axios.get("https://gnews.io/api/v4/top-headlines", {
      params: {
        country: countryCode,
        lang: "en",
        max: 10,
        apikey: apiKey
      }
    });

    const articles = response.data.articles;

    if (!articles || articles.length === 0) {
      return res.status(404).json({
        error: `No headlines found for country code: "${country}".`
      });
    }

    const headlines = articles.map((article) => ({
      title: article.title,
      source: article.source.name,
      url: article.url,
      publishedAt: article.publishedAt
    }));

    res.json({
      country: countryCode,
      totalResults: headlines.length,
      headlines
    });

  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 403) {
        return res.status(403).json({ error: "Invalid API key or request limit reached." });
      }
      return res.status(status).json({ error: error.response.data.errors?.[0] || "API error occurred." });
    }
    res.status(500).json({ error: "Failed to connect to news service." });
  }
});

app.listen(PORT, () => console.log(`News API running on port ${PORT}`));