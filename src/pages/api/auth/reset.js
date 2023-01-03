import { hashPassword } from '../../../../lib/auth';

import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/user';
import nodemailer from 'nodemailer';

const resetHandler = async (req, res) => {
	const { method } = req;
	await dbConnect();

	switch (method) {
		case 'POST':
			await sendResetPasswordLink(req, res);
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};

const sendResetPasswordLink = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({
			email,
		});
		if (!user) {
			return res.status(400).json({
				message: 'User not found',
				success: false,
			});
		}
		const token = user.generateResetPasswordToken();

		const user2 = await User.findOneAndUpdate(email, { token: token });

		const resetLink = `http://localhost:3000/forgot-password/${token}`;
		console.log('Google Email: ' + process.env.GOOGLE_EMAIL);
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.GOOGLE_EMAIL,
				pass: process.env.GOOGLE_PASSWORD,
			},
		});
		const mailOptions = {
			from: 'h7143084090@gmail.com',
			to: email,
			subject: 'Reset Password',
			text: resetLink,
		};
		transporter.sendMail(mailOptions, (err, info) => {
			if (err) {
				console.log(err);
				return res.status(400).json({
					message: err,
					success: false,
				});
			}
			return res.status(200).json({
				message: 'Reset password link has been sent',
				success: true,
				data: resetLink,
			});
		});
	} catch (error) {
		return res.status(400).json({
			message: new Error(error).message,
			success: false,
		});
	}
};

export default resetHandler;
