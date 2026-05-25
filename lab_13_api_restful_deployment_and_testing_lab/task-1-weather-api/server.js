const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/api/weather/:city", async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = response.data;

    res.json({
      city: data.name,
      temperature: data.main.temp,
      condition: data.weather[0].description,
      humidity: data.main.humidity
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: "City not found. Please check the city name." });
    } else {
      res.status(500).json({ error: "Failed to fetch weather data." });
    }
  }
});

app.listen(PORT, () => console.log(`Weather API running on port ${PORT}`));