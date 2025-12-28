const axios = require('axios');

module.exports = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ status: 'error', message: 'Missing url parameter' });
  }

  try {
    const response = await axios.get(
      `https://ytdl.socialplug.io/api/video-info?url=${encodeURIComponent(url)}`,
      {
        headers: {
          'authority': 'ytdl.socialplug.io',
          'accept': 'application/json, text/plain, */*',
          'origin': 'https://www.socialplug.io',
          'referer': 'https://www.socialplug.io/',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 11) AppleWebKit/537.36 Chrome/107.0.0.0 Mobile Safari/537.36'
        }
      }
    );

    // 🔥 Extract audio formats (mp4 / webm)
    const audioFormats = response.data.format_options.audio;

    // Find first available audio URL
    let audioUrl = null;

    if (audioFormats.mp4 && audioFormats.mp4.length > 0) {
      audioUrl = audioFormats.mp4[0].url;
    } else if (audioFormats.webm && audioFormats.webm.length > 0) {
      audioUrl = audioFormats.webm[0].url;
    }

    if (!audioUrl) {
      return res.status(404).json({ status: 'error', message: 'Audio not found' });
    }

    // ✅ Return ONLY audio URL
    res.status(200).json(audioUrl);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: 'error', message: 'Failed to fetch audio' });
  }
};
