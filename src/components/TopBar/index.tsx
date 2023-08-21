import Image from "next/image";
import LogoSVG from "../../../public/imgs/logo.svg";
import Link from "next/link";

interface TopBarProps {}

export function TopBar({}: TopBarProps) {
	return (
		<div className="bg-primary w-full h-16 flex items-center px-20 justify-center shadow-xl">
			<main>
				<Link href="/">
					<Image
						src={LogoSVG}
						alt="mimir logo"
						width={40}
						height={40}
						className="hover:opacity-60 transition-opacity cursor-pointer active:opacity-100"></Image>
				</Link>
			</main>
		</div>
	);
}
