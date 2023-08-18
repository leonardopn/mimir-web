import "../theme/globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ReactNode } from "react";
import ThemeRegistry from "../theme/ThemeRegistry";

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
				<main className="h-screen p-5 bg-slate-200">
					<ThemeRegistry options={{ key: "css" }}>{children}</ThemeRegistry>
				</main>
			</body>
		</html>
	);
}
