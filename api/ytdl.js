const express = require('express');
const axios = require('axios');
const app = express();

app.get('/dl', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: 'error', message: 'Missing url parameter' });
  }

  try {
 import axios from 'axios';

const response = await axios.get('https://ytdl.socialplug.io/api/video-info?url=https:%2F%2Fyoutube.com%2Fshorts%2FKUkr0lUXwAU%3Fsi%3DjWLQ4W0zgJ2Dh_JU', {
  headers: {
    'authority': 'ytdl.socialplug.io',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9',
    'if-none-match': 'W/"1d29-20HsQZBjni5ZjrAJQxPlf8MnHhE"',
    'origin': 'https://www.socialplug.io',
    'referer': 'https://www.socialplug.io/',
    'sec-ch-ua': '"Chromium";v="107", "Not=A?Brand";v="24"',
    'sec-ch-ua-mobile': '?1',
    'sec-ch-ua-platform': '"Android"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Linux; Android 11; RMX3261) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36'
  }
});

    // Forward the CDNFrame response (or pick specific fields as needed)
res.json(response.data);

} catch (error) { console.error(error); } });

app.listen(3000, () => { console.log("api is running"); });
