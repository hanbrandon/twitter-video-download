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
		// check if the post already exists
		const postExists = await Post.exists({
			radiokoreaID: req.body.id,
		});
		if (postExists) {
			return res
				.status(200)
				.json({ success: false, error: 'Post already exists' });
		}
		console.log('Post does not exist, creating...', postExists);
		const post = await Post.create({
			radiokoreaID: req.body.id,
			radiokoreaAuthor: req.body.author,
			radiokoreaLocation: req.body.location,
			tags: req.body.location.trim().replace(/\s+/g, ' '),
			radiokoreaPhone: req.body.phone,
			title: req.body.title,
			content: req.body.content,
			categories: ['opening', 'job'],
			views: Number(req.body.views),
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
