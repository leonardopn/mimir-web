import Link from "next/link";

import { ResponsiveLogo } from "@components/ResponsiveLogo";

interface TopBarProps {}

export function TopBar({}: TopBarProps) {
	return (
		<div className="bg-primary w-full h-16 flex items-center xl:px-40 lg:px-20 px-5  justify-between shadow-xl">
			<Link href="/" className="hover:opacity-60 transition-opacity">
				<ResponsiveLogo />
			</Link>
		</div>
	);
}
