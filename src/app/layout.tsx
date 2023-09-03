import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ReactNode } from "react";
import ThemeRegistry from "../theme/ThemeRegistry";
import "../theme/globals.css";

import { LocalizationProvider } from "../providers/LocalizationProvider";
import { TopBar } from "@components/TopBar";

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
				<main className="min-h-screen bg-slate-200 flex flex-col">
					<header className="sticky top-0 z-[9999]">
						<TopBar></TopBar>
					</header>
					<div className="px-5 py-10 flex-1 flex flex-col">
						<LocalizationProvider>
							<ThemeRegistry options={{ key: "css" }}>{children}</ThemeRegistry>
						</LocalizationProvider>
					</div>
				</main>
			</body>
		</html>
	);
}
