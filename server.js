const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('dist'));
app.use(express.json());

app.put('/api/identity', async (req, res) => {
  try {
    const payload = req.body;

    if (!payload || Object.keys(payload).length === 0) {
      return res.status(400).json({ error: 'Empty or invalid JSON payload' });
    }

    const response = await fetch(process.env.API_ENDPOINT, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData && typeof errorData === 'object') {
        res.status(response.status).json(errorData);
        return;
      }

      throw new Error(
        `Forwarded request failed with status ${response.status}`
      );
    }

    const responseData = await response.json();
    res.status(response.status).json(responseData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
