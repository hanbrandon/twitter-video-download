import dbConnect from '../../../lib/dbConnect';
import Twitter from '../../../models/twitter';

const axios = require('axios');
const twitterUrlDirect = require('twitter-url-direct');

const handler = async (req, res) => {
	const { method } = req;
	await dbConnect();

	switch (method) {
		case 'POST':
			await postVideoInfo(req, res);
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};

const postVideoInfo = async (req, res) => {
	const { url } = req.body;
	try {
		// Use twitter-url-direct to get the direct URL of the video
		await twitterUrlDirect(url).then(async (response) => {
			const twittterBody = {
				videoUrl: response.download[response.download.length - 1].url,
				username: response.tweet_user.username,
				name: response.tweet_user.name,
			};
			const twitter = await Twitter.findOne({
				videoUrl: twittterBody.videoUrl,
			});
			if (twitter) {
				await Twitter.findOneAndUpdate(
					{ videoUrl: twittterBody.videoUrl },
					{ updatedAt: new Date() },
				);
			} else {
				await Twitter.create(twittterBody);
			}
			const twitters = await Twitter.find({}).sort({ updatedAt: -1 });
			return res.status(200).json({ success: true, ...response, twitters });
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({ success: false });
	}
};

export default handler;
