import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ReactNode } from "react";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

export const metadata: Metadata = {
    title: "My Finance",
    description: "Gerenciei suas finanças de forma simples e prática.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="pt-BR" className="dark:bg-background-dark dark:text-textColor-dark h-screen p-5">
            <body className={roboto.className}>{children}</body>
        </html>
    );
}
