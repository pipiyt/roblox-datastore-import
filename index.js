const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const API_KEY = process.env.ROBLOX_API_KEY;
const UNIVERSE_ID = process.env.UNIVERSE_ID;
const DATASTORE_NAME = "PlayerSaveData";

// === POST /import ===
// Payload format:
// {
//   "123456": { "Donated": 1000, "Raised": 500 }
// }
app.post('/import', async (req, res) => {
  const data = req.body;

  for (const [userId, values] of Object.entries(data)) {
    try {
      await axios.post(
        `https://apis.roblox.com/datastores/v1/universes/${UNIVERSE_ID}/standard-datastores/${DATASTORE_NAME}/entries/entry`,
        {
          entryKey: `Player_${userId}`,
          data: values
        },
        {
          headers: {
            'x-api-key': API_KEY,
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (error) {
      console.error(`❌ Failed to update ${userId}:`, error.response?.data || error.message);
    }
  }

  res.sendStatus(200);
});

// === GET /user/:id ===
// Returns { Donated: ..., Raised: ... }
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const response = await axios.get(
      `https://apis.roblox.com/datastores/v1/universes/${UNIVERSE_ID}/standard-datastores/${DATASTORE_NAME}/entries/entry?entryKey=Player_${userId}`,
      {
        headers: {
          'x-api-key': API_KEY
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(`❌ Failed to fetch ${userId}:`, error.response?.data || error.message);
    res.status(404).json({ error: 'Not found' });
  }
});

app.listen(3000, () => {
  console.log('🚀 Server started on port 3000');
});
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const API_KEY = process.env.ROBLOX_API_KEY;
const UNIVERSE_ID = process.env.UNIVERSE_ID;
const DATASTORE_NAME = "PlayerSaveData";

// === POST /import ===
// Payload format:
// {
//   "123456": { "Donated": 1000, "Raised": 500 }
// }
app.post('/import', async (req, res) => {
  const data = req.body;

  for (const [userId, values] of Object.entries(data)) {
    try {
      await axios.post(
        `https://apis.roblox.com/datastores/v1/universes/${UNIVERSE_ID}/standard-datastores/${DATASTORE_NAME}/entries/entry`,
        {
          entryKey: `Player_${userId}`,
          data: values
        },
        {
          headers: {
            'x-api-key': API_KEY,
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (error) {
      console.error(`❌ Failed to update ${userId}:`, error.response?.data || error.message);
    }
  }

  res.sendStatus(200);
});

// === GET /user/:id ===
// Returns { Donated: ..., Raised: ... }
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const response = await axios.get(
      `https://apis.roblox.com/datastores/v1/universes/${UNIVERSE_ID}/standard-datastores/${DATASTORE_NAME}/entries/entry?entryKey=Player_${userId}`,
      {
        headers: {
          'x-api-key': API_KEY
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(`❌ Failed to fetch ${userId}:`, error.response?.data || error.message);
    res.status(404).json({ error: 'Not found' });
  }
});

app.listen(3000, () => {
  console.log('🚀 Server started on port 3000');
});
