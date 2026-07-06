require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { getTrafficByArea, calculateRiskScore, getAllAreas } = require('./bigquery-service');
const { getRecommendation } = require('./gemini-service');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/traffic/:area', async (req, res) => {
  try {
    const data = await getTrafficByArea(req.params.area);
    const enriched = data.map(row => ({ ...row, risk: calculateRiskScore(row) }));
    res.json(enriched);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch traffic data' });
  }
});

app.get('/api/recommendation/:area', async (req, res) => {
  try {
    const data = await getTrafficByArea(req.params.area);
    const enriched = data.map(row => ({ ...row, risk: calculateRiskScore(row) }));
    const advice = await getRecommendation(req.params.area, enriched);
    res.json({ advice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get recommendation' });
  }
});

app.get('/api/areas', async (req, res) => {
  try {
    const areas = await getAllAreas();
    res.json(areas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch areas' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));