const axios = require('axios');

module.exports = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  try {
    const { data } = await axios.get(
      `https://ytdl.socialplug.io/api/video-info?url=${encodeURIComponent(url)}`,
      {
        headers: {
          'user-agent':
            'Mozilla/5.0 (Linux; Android 11) AppleWebKit/537.36 Chrome/107.0.0.0 Mobile Safari/537.36',
          'origin': 'https://www.socialplug.io',
          'referer': 'https://www.socialplug.io/'
        }
      }
    );

    const audio =
      data.format_options.audio?.mp4?.[0] ||
      data.format_options.audio?.webm?.[0];

    if (!audio) {
      return res.status(404).json({ error: 'Audio not found' });
    }

    // ✅ ONLY mimeType
    res.json({ mimeType: audio.mimeType });

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch audio' });
  }
};
