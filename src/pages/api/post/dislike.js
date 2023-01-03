import dbConnect from '../../../../lib/dbConnect';
import Post from '../../../../models/post';

const handler = async (req, res) => {
	const { method } = req;
	await dbConnect();
	switch (method) {
		case 'PUT':
			await updatePost(req, res);
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};

const updatePost = async (req, res) => {
	try {
		const { postId, userId } = req.body;
		const post = await Post.findById(postId);

		if (post.dislikes.includes(userId)) {
			const postUpdated = await Post.findByIdAndUpdate(
				{ _id: postId },
				{ $pull: { dislikes: userId } },
				{ new: true },
			);
			return res
				.status(200)
				.json({ success: true, dislikes: postUpdated.dislikes });
		} else {
			const postUpdated = await Post.findByIdAndUpdate(
				{ _id: postId },
				{ $push: { dislikes: userId } },
				{ new: true },
			);
			return res
				.status(200)
				.json({ success: true, dislikes: postUpdated.dislikes });
		}
	} catch (error) {
		return res.status(400).json({ success: false });
	}
};

export default handler;
