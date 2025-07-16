const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());

const ROBLOX_API_KEY = process.env.ROBLOX_API_KEY;
const UNIVERSE_ID = process.env.UNIVERSE_ID;
const DATASTORE_NAME = process.env.DATASTORE_NAME;

app.post("/import", async (req, res) => {
  const data = req.body;

  if (!ROBLOX_API_KEY || !UNIVERSE_ID || !DATASTORE_NAME) {
    return res.status(500).send("Missing environment variables");
  }

  const results = [];

  for (const userId in data) {
    const donated = data[userId];

    try {
      const response = await axios.post(
        `https://apis.roblox.com/datastores/v1/universes/${UNIVERSE_ID}/standard-datastores/datastore/entries/entry`,
        JSON.stringify(donated),
        {
          params: {
            datastoreName: DATASTORE_NAME,
            entryKey: `Player_${userId}`,
          },
          headers: {
            "x-api-key": ROBLOX_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      results.push({ userId, status: "success" });
    } catch (err) {
      results.push({ userId, status: "error", error: err.message });
    }
  }

  res.json({ results });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});
