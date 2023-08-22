/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "m.media-amazon.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "firebasestorage.googleapis.com",
				port: "",
			},
		],
	},
};

module.exports = nextConfig;
