import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const twitterSchema = new Schema(
	{
		videoUrl: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			trim: true,
			required: true,
		},
		name: {
			type: String,
			trim: true,
			required: true,
		},
	},
	{ timestamps: true },
);

mongoose.models = {};

const Twitter = mongoose.model('Twitter', twitterSchema);

export default Twitter;
