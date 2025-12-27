const express = require('express');
const axios = require('axios');

const app = express();

app.get('/dl', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: 'error', message: 'Missing url' });
  }

  try {
    const response = await axios.get(
      `https://ytdl.socialplug.io/api/video-info?url=${encodeURIComponent(url)}`
    );

    const mp4 = response.data.format_options.video.mp4;

    const result = {};

    mp4.forEach(v => {
      if (v.quality === '480p' || v.quality === '720p60') {
        result[v.quality] = v.url;
      }
    });

    res.json({
      status: 'success',
      videos: result
    });

  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

app.listen(3000, () => console.log('API running'));
