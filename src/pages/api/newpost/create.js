import dbConnect from '../../../../lib/dbConnect';
import Post from '../../../../models/post';

const handler = async (req, res) => {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case 'POST':
			await createPost(req, res);
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};

const createPost = async (req, res) => {
	try {
		const post = await Post.create({
			title: req.body.title,
			content: req.body.content,
			category: req.body.category,
			author: req.body.author,
			views: req.body.views ? Number(req.body.views) : 0,
			like: req.body.like ? Number(req.body.like) : 0,
			dislike: req.body.dislike ? Number(req.body.dislike) : 0,
		});
		return res.status(201).json({
			success: true,
			data: post,
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
			error: error.message,
		});
	}
};

export default handler;
