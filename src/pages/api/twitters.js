import dbConnect from '../../../lib/dbConnect';
import Twitter from '../../../models/twitter';

const handler = async (req, res) => {
	const { method } = req;
	await dbConnect();

	switch (method) {
		case 'GET':
			await getTwitters(req, res);
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};

const getTwitters = async (req, res) => {
	try {
		const twitters = await Twitter.find({}).sort({ updatedAt: -1 });
		return res.status(200).json({ success: true, twitters });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ success: false });
	}
};

export default handler;
