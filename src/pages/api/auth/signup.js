import { hashPassword } from '../../../../lib/auth';
import { connectToDatabase } from '../../../../lib/mongodb';

import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/user';

const signupHandler = async (req, res) => {
	const { method } = req;
	await dbConnect();

	switch (method) {
		case 'POST':
			await addUser(req, res);
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};

const addUser = async (req, res) => {
	const { email, fullName, username, password, nickname } = req.body;
	try {
		const hashedPassword = await hashPassword(password);
		const user = await User.create({
			email,
			fullName,
			username,
			password: hashedPassword,
			nickname,
		});
		return res.status(200).json({
			message: 'User created successfully',
			success: true,
			user: {
				email: user.email,
				fullName: user.fullName,
				username: user.username,
				nickname: user.nickname,
			},
		});
	} catch (error) {
		return res.status(400).json({
			message: new Error(error).message,
			success: false,
		});
	}
};

export default signupHandler;
