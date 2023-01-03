import mongoose from 'mongoose';
import crypto from 'crypto';
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		fullName: {
			type: String,
			trim: true,
			required: true,
			min: 2,
			max: 32,
		},
		nickname: {
			type: String,
			trim: true,
			min: 2,
			max: 32,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			min: 5,
			required: true,
		},
		image: {
			type: String,
			trim: true,
		},
		emailVerified: {
			type: Boolean,
			default: false,
		},
		phone: {
			type: String,
			trim: true,
			max: 32,
		},
		zipCode: {
			type: String,
			trim: true,
			max: 18,
		},
		streetAddress: {
			type: String,
			trim: true,
		},
		username: {
			type: String,
			trim: true,
			required: true,
		},
		secondAddress: { type: String, trim: true },
		website: { type: String, trim: true, max: 32 },
		facebook: { type: String, trim: true, max: 32 },
		twitter: { type: String, trim: true, max: 32 },
		instagram: { type: String, trim: true, max: 32 },
		youtube: { type: String, trim: true, max: 32 },
		spotify: { type: String, trim: true, max: 32 },

		role: {
			type: Number,
			default: 0, // 0: user, 1: admin, 2: artist
		},
		history: { type: Array, default: [] },
		terms: { type: Boolean, default: false },
		copyRight: { type: Boolean, default: false },
		token: { type: String },
	},
	{ timestamps: true },
);

const generateResetPasswordToken = function () {
	const resetPasswordToken = crypto.randomBytes(20).toString('hex');
	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetPasswordToken)
		.digest('hex');
	this.resetPasswordExpires = Date.now() + 3600000; // 1 hour
	return resetPasswordToken;
};

userSchema.methods.generateResetPasswordToken = generateResetPasswordToken;

mongoose.models = {};

const User = mongoose.model('User', userSchema);

export default User;
