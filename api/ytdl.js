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
        'user-agent': 'Mozilla/5.0 (Linux; Android 11) AppleWebKit/537.36 Chrome/107 Mobile Safari/537.36',
        'accept': 'application/json'
      }
    });

    const videos = response.data?.format_options?.video?.mp4 || [];

    // Filter only 480p & 720p60
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
