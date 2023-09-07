"use client";

import { useResponsive } from "@hooks/useResponsive";
import AppNameSVG from "../../../public/imgs/app_name.svg";
import LogoSVG from "../../../public/imgs/logo.svg";
import Image from "next/image";

interface ResponsiveLogoProps {}

export function ResponsiveLogo({}: ResponsiveLogoProps) {
	const isSm = useResponsive("sm");

	if (!isSm) {
		return (
			<Image
				src={AppNameSVG}
				alt="app_name"
				width={80}
				height={50}
				className="cursor-pointer active:opacity-100"></Image>
		);
	}

	return (
		<Image
			src={LogoSVG}
			alt="mimir_logo"
			width={40}
			height={40}
			className="cursor-pointer active:opacity-100"></Image>
	);
}
