import dbConnect from '../../../../lib/dbConnect';
import Post from '../../../../models/post';

const handler = async (req, res) => {
	const { method } = req;
	await dbConnect();
	switch (method) {
		case 'POST':
			await createPost(req, res);
			break;
		case 'GET':
			await getPost(req, res);
			break;
		case 'PUT':
			await updatePost(req, res);
			break;
		case 'DELETE':
			await deletePost(req, res);
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};

const createPost = async (req, res) => {
	try {
		const post = await Post.create(req.body);
		return res.status(201).json({ success: true, post: post });
	} catch (error) {
		return res.status(400).json({ success: false });
	}
};

const updatePost = async (req, res) => {
	try {
		const { id } = req.body;
		const post = await Post.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		return res.status(200).json({ success: true, post: post });
	} catch (error) {
		return res.status(400).json({ success: false });
	}
};

const getPost = async (req, res) => {
	try {
		const post = await Post.findById({
			_id: req.query.id,
		}).populate('author');
		return res.status(200).json({ success: true, post: post });
	} catch (error) {
		return res.status(400).json({ success: false });
	}
};

export default handler;
