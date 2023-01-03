import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/post';
import User from '../../../models/user';
import { getVideoUrl } from 'twitter-url-direct';
import axios from 'axios';

const handler = async (req, res) => {
	const { method } = req;
	await dbConnect();
	switch (method) {
		case 'GET':
			await downloadVideo(req, res);
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};

const downloadVideo = async (req, res) => {
	const { url } = req.query;

	try {
		// Use twitter-url-direct to get the direct URL of the video
		const videoUrl = await getVideoUrl(url);

		// Use Axios to download the video from the direct URL
		const response = await axios({
			url: videoUrl,
			method: 'GET',
			responseType: 'stream',
		});

		// Save the video to the database
		const video = new TwitterVideo({ url: videoUrl });
		await video.save();

		// Set the appropriate response headers and send the video data back to the client
		res.setHeader('Content-Type', 'video/mp4');
		res.setHeader('Content-Disposition', 'attachment; filename=video.mp4');
		response.data.pipe(res);
	} catch (error) {
		return res.status(400).json({ success: false });
	}
};

export default handler;
