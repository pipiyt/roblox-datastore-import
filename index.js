const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const API_KEY = process.env.ROBLOX_API_KEY;
const UNIVERSE_ID = process.env.UNIVERSE_ID;
const DATASTORE_NAME = "PlayerSaveData";

// === POST /import ===
// Пример данных, которые отправляются:
// {
//   "123456": { "Donated": 1000, "Raised": 500 }
// }
app.post('/import', async (req, res) => {
  const data = req.body;

  for (const [userId, values] of Object.entries(data)) {
    try {
      await axios.post(
        `https://apis.roblox.com/datastores/v1/universes/${UNIVERSE_ID}/standard-datastores/datastore/entries/entry`,
        {
          datastoreName: DATASTORE_NAME,
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
      console.log(`✅ Успешно обновлено: Player_${userId}`);
    } catch (error) {
      console.error(`❌ Ошибка обновления ${userId}:`, error.response?.data || error.message);
    }
  }

  res.sendStatus(200);
});

// === GET /user/:id ===
// Вернёт { Donated: ..., Raised: ... }
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const response = await axios.get(
      `https://apis.roblox.com/datastores/v1/universes/${UNIVERSE_ID}/standard-datastores/datastore/entries/entry?datastoreName=${DATASTORE_NAME}&entryKey=Player_${userId}`,
      {
        headers: {
          'x-api-key': API_KEY
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(`❌ Не удалось получить данные ${userId}:`, error.response?.data || error.message);
    res.status(404).json({ error: 'Not found' });
  }
});

app.listen(3000, () => {
  console.log('🚀 Сервер запущен на порту 3000');
});
