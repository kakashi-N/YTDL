// Install dependencies first:
// npm init -y
// npm install express axios

const express = require('express');
const axios = require('axios');
const app = express();

app.get('/dl', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing url parameter'
    });
  }

  try {
    // Encode the user-provided URL
    const apiUrl = `https://ytdl.socialplug.io/api/video-info?url=${encodeURIComponent(url)}`;

    const response = await axios.get(apiUrl, {
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
        'user-agent': 'Mozilla/5.0 (Linux; Android 11; RMX3261) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36',
        'cookie': '__Secure-3PAPISID=XXX; CONSENT=YES+1; __Secure-1PSID=XXX' // যদি cookie লাগে, এখানে বসাও
      }
    });

    const videos = response.data?.format_options?.video?.mp4 || [];

    // Filter only 480p & 720p60 URLs
    const filtered = {};
    videos.forEach(v => {
      if (v.quality === '480p' || v.quality === '720p60') {
        filtered[v.quality] = v.url;
      }
    });

    res.json({
      status: 'success',
      videos: filtered
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch video data'
    });
  }
});

app.listen(3000, () => {
  console.log('API is running on http://localhost:3000');
});
