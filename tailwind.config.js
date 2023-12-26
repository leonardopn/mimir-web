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
					50: "#ecd9eb",
					100: "#d8a9d1",
					200: "#c579b7",
					300: "#b0489d",
					400: "#9e187e",
					500: "#550044",
					600: "#4c003c",
					700: "#3e0030",
					800: "#330025",
					900: "#2a001c",
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
