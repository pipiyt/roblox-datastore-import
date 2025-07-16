const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const axios = require("axios");

app.use(express.json());

console.log("✅ Сервер запущен");
console.log("DATASTORE_NAME:", process.env.DATASTORE_NAME);
console.log("UNIVERSE_ID:", process.env.UNIVERSE_ID);

// Получаем переменные окружения
const DATASTORE_NAME = process.env.DATASTORE_NAME;
const UNIVERSE_ID = process.env.UNIVERSE_ID;
const API_KEY = process.env.ROBLOX_API_KEY;

// Главная точка входа
app.post("/api/save", async (req, res) => {
	const { userId, donated, raised } = req.body;

	if (!userId || donated == null || raised == null) {
		return res.status(400).send("Missing data fields");
	}

	try {
		console.log("📥 Получены данные:", { userId, donated, raised });

		// Отправка данных в Roblox DataStore API
		const headers = {
			"Content-Type": "application/json",
			"x-api-key": API_KEY
		};

		// Обновляем Donated
		const donatedUrl = `https://apis.roblox.com/datastores/v1/universes/${UNIVERSE_ID}/standard-datastores/datastore/entries/entry?datastoreName=${DATASTORE_NAME}&entryKey=Player_${userId}`;
		const donatedData = {
			data: {
				Donated: donated
			}
		};

		await axios.post(donatedUrl, donatedData, { headers });
		console.log("✅ Donated обновлено");

		// Обновляем Raised
		const raisedUrl = `https://apis.roblox.com/datastores/v1/universes/${UNIVERSE_ID}/standard-datastores/datastore/entries/entry?datastoreName=${DATASTORE_NAME}&entryKey=Player_${userId}`;
		const raisedData = {
			data: {
				Raised: raised
			}
		};

		await axios.post(raisedUrl, raisedData, { headers });
		console.log("✅ Raised обновлено");

		res.status(200).send("Data saved");
	} catch (err) {
		console.error("❌ Ошибка:", err.response?.data || err.message);
		res.status(500).send("Ошибка сервера");
	}
});

// Запуск сервера
app.listen(port, () => {
	console.log(`🚀 Сервер слушает порт ${port}`);
});
