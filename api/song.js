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

    // 🔥 Get all formats
    const formats = response.data.formats || response.data.adaptiveFormats || [];

    // 🎧 Filter audio-only formats
    const audioFormats = formats.filter(f =>
      f.mimeType && f.mimeType.startsWith('audio/')
    );

    if (!audioFormats.length) {
      return res.status(404).json({ status: 'error', message: 'Audio not found' });
    }

    // ✅ Pick best audio (highest bitrate)
    audioFormats.sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0));

    // 🔥 RETURN ONLY URL (plain response)
    res.status(200).send(audioFormats[0].url);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: 'error', message: 'Failed to fetch audio' });
  }
};
