import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true,
			min: 2,
			max: 32,
		},
		categories: {
			type: Array,
			trim: true,
			default: [],
		},
		tags: {
			type: Array,
			trim: true,
			default: [],
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			// required: true,
		},
		content: {
			type: String,
			required: true,
			min: 2,
		},
		likes: {
			type: [Schema.Types.ObjectId],
			ref: 'User',
			default: [],
		},
		dislikes: {
			type: [Schema.Types.ObjectId],
			ref: 'User',
			default: [],
		},
		views: {
			type: Number,
			default: 0,
		},
		comments: {
			type: [Schema.Types.ObjectId],
			ref: 'Comment',
			default: [],
		},
		radiokoreaID: {
			type: String,
		},
		radiokoreaAuthor: {
			type: String,
		},
		radiokoreaLocation: {
			type: String,
		},
	},
	{ timestamps: true },
);
mongoose.models = {};

const Post = mongoose.model('Post', postSchema);

export default Post;
