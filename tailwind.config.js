/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    important: "#__next",
    theme: {
        fontFamily: {
            sans: ["Roboto", "Arial", "sans-serif"],
        },
        extend: {
            colors: {
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
