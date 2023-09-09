import { useMediaQuery } from "react-responsive";

export function useResponsive() {
	const isUpSm = useMediaQuery({ minWidth: 640 });
	const isUpMd = useMediaQuery({ minWidth: 768 });
	const isUpLg = useMediaQuery({ minWidth: 1024 });
	const isUpXl = useMediaQuery({ minWidth: 1280 });
	const isUp2xl = useMediaQuery({ minWidth: 1536 });

	return { isUpSm, isUpMd, isUpLg, isUpXl, isUp2xl };
}
