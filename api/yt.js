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
          'accept-language': 'en-US,en;q=0.9',
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
      }
    );

    // Extract only the qualities you want
    const videos = response.data.format_options.video.mp4;
    const filteredQualities = ['480p', '720p', '1080p'];
    const result = videos
      .filter(v => filteredQualities.includes(v.quality))
      .map(v => ({ quality: v.quality }));

    res.status(200).json({ status: 'success', urls: result });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: 'error', message: 'Failed to fetch video info' });
  }
};
