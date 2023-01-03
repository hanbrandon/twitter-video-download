import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

import clientPromise from '../../../../lib/mongodb';

import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
// import Providers from 'next-auth/providers';

import { MongoClient } from 'mongodb';

import { verifyPassword } from '../../../../lib/auth';
import { connectToDatabase } from '../../../../lib/db';
const { parseCookies, setCookie, destroyCookie } = require('nookies');

import dbConnect from '../../../../lib/dbConnect';

export default async function auth(req, res) {
	const cookies = parseCookies({ req });
	const maxAge =
		cookies.remember === 'true' ? 30 * 24 * 60 * 60 : 1 * 24 * 60 * 60; // 30 days, 1 day

	return await NextAuth(req, res, {
		providers: [
			CredentialsProvider({
				async authorize(credentials) {
					//Connect to DB
					const client = await connectToDatabase();
					const usersCollection = await client.db().collection('users');
					const result = await usersCollection.findOne({
						username: credentials.username,
					});

					if (!result) {
						client.close();
						throw new Error('No user found!');
					}

					const isValid = await verifyPassword(
						credentials.password,
						result.password,
					);

					if (!isValid) {
						client.close();

						throw new Error('Could not log you in!');
					}

					client.close();
					const user = {
						id: result._id,
						email: result.email,
						fullName: result.fullName,
						username: result.username,
						nickname: result.nickname,
						role: result.role,
						remember: credentials.remember,
					};

					return user;
				},
			}),

			GoogleProvider({
				clientId: process.env.GOOGLE_ID,
				clientSecret: process.env.GOOGLE_SECRET,
			}),
		],

		adapter: MongoDBAdapter(clientPromise),
		callbacks: {
			// called after sucessful signin
			jwt: async ({ token, user }) => {
				user && (token.user = user);
				return token;
			}, // called whenever session is checked
			session: async (data) => {
				const { session, token } = data;
				session.user = token.user;
				return session;
			},
		},
		secret: process.env.SECRET_KEY,
		session: {
			strategy: 'jwt',
			maxAge: maxAge,
		},
		jwt: {
			secret: process.env.SECRET_KEY,
			encryption: true,
		},
		pages: {
			signIn: './login',
		},
	});
}
