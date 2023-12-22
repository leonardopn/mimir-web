/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		fontFamily: {
			sans: ["Roboto", "Arial", "sans-serif"],
		},
		extend: {
			colors: {
				primary: {
					100: "#9f4c8f",
					200: "#822f71",
					300: "#741a62",
					400: "#61094f",
					500: "#550044",
					600: "#3f0032",
					700: "#2e0025",
					800: "#26001e",
					900: "#200019",
				},
				secondary: "#F4D35E",
				background: {
					light: "#f8f8f2",
					main: "#282a36",
					dark: "#282a36",
				},
				background2: {
					light: "#f8f8f2",
					main: "#44475a",
					dark: "#44475a",
				},
				textColor: {
					light: "#282a36",
					main: "#f8f8f2",
					dark: "#f8f8f2",
				},
				success: "#50fa7b",
				error: "#ff5555",
				purple: "#bd93f9",
				orange: "#ffb86c",
			},
		},
	},
	corePlugins: {
		preflight: false,
	},
	plugins: [],
};
