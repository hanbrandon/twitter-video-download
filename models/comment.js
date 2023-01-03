import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema(
	{
		content: {
			type: String,
			required: true,
			min: 2,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		postId: {
			type: Schema.Types.ObjectId,
			ref: 'Post',
			required: true,
		},
	},
	{ timestamps: true },
);
mongoose.models = {};

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
