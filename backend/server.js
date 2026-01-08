const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// endpoint standings
app.get('/api/standings', async (req, res) => {
  try {
    const response = await axios.get('https://api-web.nhle.com/v1/standings/now');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching standings:', error.message);
    res.status(502).json({ error: 'Failed to fetch standings from NHL API' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

// endpoint horaires
app.get('/api/horaire', async (req, res) => {
  try {
    const response = await axios.get('https://api-web.nhle.com/v1/schedule/now');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching schedule:', error.message);
    res.status(502).json({ error: 'Failed to fetch schedule from NHL API' });
  }
});