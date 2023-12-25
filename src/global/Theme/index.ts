import { extendTheme, withDefaultColorScheme, withDefaultProps } from "@chakra-ui/react";

export const theme = extendTheme(
	{
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
