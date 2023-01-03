/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	env: {
		CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
		CLOUDINARY_PRESET: process.env.CLOUDINARY_PRESET,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
	},
	images: {
		domains: ['tailwindui.com', 'images.unsplash.com', 'res.cloudinary.com'],
	},
	experimental: {
		newNextLinkBehavior: true,
		scrollRestoration: true,
	},
	publicRuntimeConfig: {
		CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
		CLOUDINARY_PRESET: process.env.CLOUDINARY_PRESET,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
	},
};

module.exports = nextConfig;
