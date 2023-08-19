import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ReactNode } from "react";
import ThemeRegistry from "../theme/ThemeRegistry";
import "../theme/globals.css";

import { LocalizationProvider } from "../providers/LocalizationProvider";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
	title: "My Finance",
	description: "Gerenciei suas finanças de forma simples e prática.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="pt-BR">
			<body className={roboto.className} id="__next">
				<main className="min-h-screen p-5 bg-slate-200">
					<LocalizationProvider>
						<ThemeRegistry options={{ key: "css" }}>{children}</ThemeRegistry>
					</LocalizationProvider>
				</main>
			</body>
		</html>
	);
}
