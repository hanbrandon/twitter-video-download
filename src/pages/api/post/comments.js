import dbConnect from '../../../../lib/dbConnect';
import Comment from '../../../../models/comment';

const handler = async (req, res) => {
	const { method } = req;
	await dbConnect();
	switch (method) {
		case 'GET':
			await getComments(req, res);
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};

const getComments = async (req, res) => {
	try {
		const comments = await Comment.find({
			postId: req.query.postId,
		}).populate('author');
		return res.status(200).json({ success: true, comments: comments });
	} catch (error) {
		return res.status(400).json({ success: false });
	}
};

export default handler;
