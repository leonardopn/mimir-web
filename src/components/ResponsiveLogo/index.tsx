import Image from "next/image";
import AppNameSVG from "../../../public/imgs/app_name.svg";
import LogoSVG from "../../../public/imgs/logo.svg";

export function ResponsiveLogo() {
	return (
		<div className="h-10 sm:w-20 w-10 relative cursor-pointer active:opacity-100">
			<picture>
				<source media="(min-width: 640px)" srcSet={AppNameSVG.src} />
				<Image src={LogoSVG} alt="logo" fill />
			</picture>
		</div>
	);
}
