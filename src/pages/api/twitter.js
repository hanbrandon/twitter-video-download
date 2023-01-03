const axios = require('axios');
const twitterUrlDirect = require('twitter-url-direct');

const handler = async (req, res) => {
	const { method } = req;
	switch (method) {
		case 'GET':
			await getVideoInfo(req, res);
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};

const getVideoInfo = async (req, res) => {
	const { url } = req.query;

	try {
		// Use twitter-url-direct to get the direct URL of the video
		const response = await twitterUrlDirect(url);
		return res.status(200).json({ success: true, data: response });
	} catch (error) {
		return res.status(400).json({ success: false });
	}
};

export default handler;
