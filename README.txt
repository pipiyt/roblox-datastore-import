# Roblox DataStore Importer

This server receives player donation data and uploads it to a Roblox DataStore via Open Cloud API.

## Endpoints

- POST /import
  Payload example:
  {
    "123456": 1000,
    "789012": 2500
  }

## Setup (Render.com)

1. Upload project as ZIP
2. Set Environment Variables:
   - ROBLOX_API_KEY
   - UNIVERSE_ID
   - DATASTORE_NAME
3. Deploy and use the public URL from Roblox
