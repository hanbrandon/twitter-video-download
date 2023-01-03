import dbConnect from '../../../../lib/dbConnect';
import Comment from '../../../../models/comment';
import Post from '../../../../models/post';

const handler = async (req, res) => {
	const { method } = req;
	await dbConnect();
	switch (method) {
		case 'POST':
			await createComment(req, res);
			break;
		case 'GET':
			await getComment(req, res);
			break;
		case 'PUT':
			await updateComment(req, res);
			break;
		case 'DELETE':
			await deleteComment(req, res);
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};

const createComment = async (req, res) => {
	console.log(req.body);
	try {
		const comment = await Comment.create(req.body);
		const post = await Post.findByIdAndUpdate(req.body.postId, {
			$push: { comments: comment._id },
		});
		const comments = await Comment.find({ postId: req.body.postId })
			.populate('author')
			.sort({ createdAt: -1 });
		return res
			.status(201)
			.json({ success: true, comments: comments, post: post });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ success: false });
	}
};

const updateComment = async (req, res) => {
	try {
		const { id } = req.body;
		const comment = await Comment.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		return res.status(200).json({ success: true, comment: comment });
	} catch (error) {
		return res.status(400).json({ success: false });
	}
};

const getComment = async (req, res) => {
	try {
		const comment = await Comment.findById({
			_id: req.query.id,
		}).populate('author');
		return res.status(200).json({ success: true, comment: comment });
	} catch (error) {
		return res.status(400).json({ success: false });
	}
};

const deleteComment = async (req, res) => {
	try {
		const { id } = req.body;
		const comment = await Comment.findByIdAndDelete(id);
		return res.status(200).json({ success: true, comment: comment });
	} catch (error) {
		return res.status(400).json({ success: false });
	}
};

export default handler;
