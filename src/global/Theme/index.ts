import { extendTheme, withDefaultColorScheme, withDefaultProps } from "@chakra-ui/react";

export const theme = extendTheme(
	{
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
		},
		fonts: {
			heading: "var(--font-roboto)",
			body: "var(--font-roboto)",
		},
		components: {
			Input: {
				defaultProps: {
					focusBorderColor: "primary.500",
				},
			},
			Select: {
				defaultProps: {
					focusBorderColor: "primary.500",
				},
			},
			Textarea: {
				defaultProps: {
					focusBorderColor: "primary.500",
				},
			},
		},
	},
	withDefaultColorScheme({
		colorScheme: "primary",
	})
);
